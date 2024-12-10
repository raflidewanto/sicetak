'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { Modal } from '@/components/ui/Modal';
import { Switch } from '@/components/ui/Switch';
import { useModal } from '@/hooks/useModal';
import { useCategories } from '@/services/categories/queries/useCategories';
import { useSubCategoriesByCategory } from '@/services/categories/queries/useSubCategoriesByCategory';
import UploadSection from '@/components/forms/UploadSection';
import PageContainer from '@/components/layout/PageContainer';
import { parseAsInteger, useQueryState } from 'nuqs';

const AddNewDocumentStepper = () => {
  const router = useRouter();
  const { openModal, closeModal, modalState } = useModal();

  const { data: categories } = useCategories();
  const [fileCategory, setFileCategory] = useState('');
  const { data: subCategories } = useSubCategoriesByCategory(fileCategory);

  const [step, setStep] = useQueryState('step', parseAsInteger.withDefault(1));
  const [fileName, setFileName] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileSubCategory, setFileSubCategory] = useState('');
  const [active, setActive] = useState(false);
  const [release, setRelease] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openModal('Success', 'Document added successfully!', 'success');
    // You can handle form submission here
  };

  const validateStep1 = () => {
    if (!fileName || !fileCategory || !fileDescription) {
      openModal('Validation Error', 'All fields in step 1 are required.', 'error');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    // if (step === 1 && !validateStep1()) return;
    nextStep();
  };

  return (
    <PageContainer scrollable>
      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold capitalize">Tambah Dokumen</h1>

            {/* Step 1 */}
            {step === 1 && (
              <section className="space-y-4 py-4">
                <div>
                  <label htmlFor="file-name" className="block text-sm font-medium text-gray-700">
                    Nama File
                  </label>
                  <Input
                    id="file-name"
                    placeholder="Enter file name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                  <section>
                    <Label>Kategori</Label>
                    <Select value={fileCategory} onValueChange={(v) => setFileCategory(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Kategori</SelectLabel>
                          {categories?.data?.map((category) => (
                            <SelectItem key={category.code} value={category.code}>
                              {category.name.split('_').join(' ')}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </section>

                  <section>
                    <Label>Sub Kategori</Label>
                    <Select
                      value={fileSubCategory}
                      onValueChange={(v) => setFileSubCategory(v)}
                      disabled={!fileCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Sub Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sub Kategori</SelectLabel>
                          {subCategories?.data?.map((subCategory) => (
                            <SelectItem
                              key={subCategory.subcategory_code}
                              value={subCategory.subcategory_code}
                            >
                              {subCategory.subcategory_name.split('_').join(' ')}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </section>
                </div>

                <div>
                  <label htmlFor="file-description" className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <Textarea
                    id="file-description"
                    placeholder="Enter file description"
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    className="mt-1 h-32"
                  />
                </div>
              </section>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <section className="space-y-4 py-4">
                <h2 className="text-lg font-semibold">Step 2: Upload Files</h2>
                <UploadSection key="corporate" />
                <UploadSection key="individual" />
              </section>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <section className="space-y-4 py-4">
                <h2 className="text-lg font-semibold">Step 3: Document Settings</h2>
                <div className="flex items-center space-x-2">
                  <Switch id="active" onCheckedChange={() => setActive(!active)} />
                  <Label htmlFor="active">{active ? 'Active' : 'Inactive'}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="release" onCheckedChange={() => setRelease(!release)} />
                  <Label htmlFor="release">{release ? 'Released' : 'Unreleased'}</Label>
                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-end space-x-4">
              {step > 1 && (
                <Button variant="ghost" type='button' onClick={prevStep}>
                  Kembali
                </Button>
              )}
              {step < 3 && (
                <Button type="button" onClick={handleNextStep}>
                  Selanjutnya
                </Button>
              )}
              {step === 3 && (
                <Button type="submit" className="bg-orange-500 text-white">
                  Simpan
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <Modal
          title={modalState.title}
          description={modalState.description}
          isOpen={modalState.isOpen}
          onClose={closeModal}
          type={modalState.type}
        />
      </Card>
    </PageContainer>
  );
};

export default AddNewDocumentStepper;
