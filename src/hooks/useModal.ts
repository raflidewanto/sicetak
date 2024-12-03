"use client";

import { useState, useCallback } from "react";

type ModalType = "success" | "warning" | "error";

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  type: ModalType;
  onClose?: () => void; // Optional callback for actions on close
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: "",
    description: "",
    type: "error",
  });

  const openModal = useCallback(
    (
      title: string,
      description: string,
      type: ModalType = "error",
      onClose?: () => void
    ) => {
      setModalState({
        isOpen: true,
        title,
        description,
        type,
        onClose, // Set callback for onClose action
      });
    },
    []
  );

  const closeModal = useCallback(() => {
    if (modalState.onClose) {
      modalState.onClose(); // Trigger the onClose callback if it exists
    }
    setModalState((prevState) => ({
      ...prevState,
      isOpen: false,
      onClose: undefined, // Reset onClose after closing
    }));
  }, [modalState.onClose]);

  return {
    modalState,
    openModal,
    closeModal,
  };
};
