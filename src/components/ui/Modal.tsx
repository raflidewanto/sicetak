'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Ban } from 'lucide-react';
import React from 'react';
import SuccessIcon from '@/assets/icons/ic-modal-success.svg';

const Icons = {
  success: <SuccessIcon className="" />,
  warning: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />,
  error: <Ban className="h-6 w-6 text-red-500" />
};

interface ModalProps {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'error';
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children, icon, type }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader className='flex flex-col items-center justify-start gap-4'>
          {Icons[type] || icon}
          <div className='flex flex-col items-center justify-start gap-2 relative -top-1'>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className='max-w-md'>
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className='flex justify-end items-center gap-3'>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
