'use client';

import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { LS_TOKEN } from '@/constants/data';
import { useModal } from '@/hooks/useModal';
import { cN } from '@/lib/utils';
import { useCreateCategory } from '@/services/categories/mutations/useCreateCategory';
import { decryptLS } from '@/utils/crypto';
import { AxiosError } from 'axios';
import CryptoJS from "crypto-js";
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AddCategoryPage = () => {
  const createCategoryMutation = useCreateCategory();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const [token, setToken] = useState("");


  const { closeModal, modalState, openModal } = useModal();

  function resetForm() {
    setCategoryName('');
    setCategoryDesc('');
  }

  useEffect(() => {
    setToken(decryptLS(localStorage.getItem(LS_TOKEN) as string));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      openModal("Error", "Invalid token", "error");
      return;
    }
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const formattedCategoryName = categoryName.toLocaleLowerCase().replaceAll(' ', '_');
    const stringToSign = `${token}${formattedCategoryName}${date}`;

    const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY as string;

    createCategoryMutation.mutate({
      name: categoryName.toLocaleLowerCase().replaceAll(' ', '_'),
      desc: categoryDesc,
      datetime: date,
      signature: CryptoJS.HmacSHA256(stringToSign, cryptoKey).toString(),
    }, {
      onSuccess(data) {
        if (!data.success) {
          openModal('Error', data.message, 'error');
          return;
        }
        openModal('Success', 'Category created successfully', 'success', () => {
          resetForm();
          window.location.href = '/sicetak/admin/dashboard/documents';
        });
      },
      onError(error) {
        if (error instanceof AxiosError) {
          openModal('Error', error.response?.data, 'error');
          return;
        }
        openModal('Error', error.message ?? "Something went wrong", 'error');
      }
    });
  }

  return (
    <PageContainer>
      <Card>
        <CardContent className="p-5">
          <h1 className="text-lg font-bold capitalize">Tambah Kategori</h1>
          <div className="my-2 flex space-x-4">
            <p className={cN(`border-b-2 border-orange-500 px-4 py-2 text-sm font-bold text-gray-800`)}>Detail</p>
          </div>

          <div className="p-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
                  Nama Kategori
                </label>
                <Input
                  id="category-name"
                  placeholder="Value"
                  className="mt-1"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="category-description"
                  placeholder="Value"
                  className="mt-1 h-32"
                  value={categoryDesc}
                  onChange={(e) => setCategoryDesc(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Link href="/sicetak/admin/dashboard/documents">
                  <Button type="button" variant="ghost" className="border border-gray-300 bg-white">
                    Kembali
                  </Button>
                </Link>
                <Button type='submit' className="bg-orange-500 text-white">Simpan</Button>
              </div>
            </form>
          </div>
          <Modal
            title={modalState?.title}
            type={modalState?.type}
            isOpen={modalState?.isOpen}
            onClose={closeModal}
            description={modalState?.description}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default AddCategoryPage;
