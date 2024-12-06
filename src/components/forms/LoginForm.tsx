"use client";

import { useModal } from '@/hooks/useModal';
import { useLogin } from '@/services/integrations/idm/mutations/useLogin';
import { generateRequestHeadersAndPayload } from '@/utils/auth';
import { getErrorMessage } from '@/utils/error';
import { getBrowser, getPlatform } from '@/utils/userAgent';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Modal } from '../ui/Modal';

type LoginFormProps = {
  ip: string;
}

const LoginForm = (props: LoginFormProps) => {
  const { ip } = props;
  const loginMutation = useLogin();


  // form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { openModal, closeModal, modalState } = useModal();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const request = generateRequestHeadersAndPayload({
      browser: getBrowser(),
      device: getPlatform(),
      device_id: "0000000001",
      ip,
      os: getPlatform(),
      user_type: 2,
      username,
    },
      password,
      process.env.NEXT_PUBLIC_PASSWORD_KEY ?? "",
      process.env.NEXT_PUBLIC_SIGNATURE_KEY_PUBLIC ?? '',
      process.env.NEXT_PUBLIC_API_KEY ?? "",
      process.env.NEXT_PUBLIC_SOURCE ?? ""
    );

    loginMutation.mutate(request?.body, {
      onSuccess: (data) => {
        if (!data?.success) {
          openModal("Error", data?.message ?? "Something went wrong", 'error');
          return;
        }
        window.location.href = '/sicetak/dashboard/documents';
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          openModal("Error", error.response?.data?.message ?? "Something went wrong", 'error');
          return;
        }
        openModal("Error", getErrorMessage(error), 'error');
      }
    });
  }
  return (
    <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6">
        <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          type="email"
          id="username"
          name="username"
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your email"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6">
        <Label htmlFor="Password" className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          type="password"
          id="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <Button
          type="submit"
        >
          Log in
        </Button>
      </div>
      <Modal
        type={modalState?.type}
        title={modalState?.title}
        description={modalState?.description}
        isOpen={modalState?.isOpen}
        onClose={closeModal}
      />
    </form>
  );
};

export default LoginForm;