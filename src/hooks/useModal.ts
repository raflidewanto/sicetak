"use client";

import { useState, useCallback } from 'react';

type ModalType = 'success' | 'warning' | 'error';

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  type: ModalType;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    description: '',
    type: 'error',
  });

  const openModal = useCallback(
    (title: string, description: string, type: ModalType = 'error') => {
      setModalState({
        isOpen: true,
        title,
        description,
        type,
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState(prevState => ({
      ...prevState,
      isOpen: false,
    }));
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
  };
};
