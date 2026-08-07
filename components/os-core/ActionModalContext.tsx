"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ActionModal from "./ActionModal";

interface ModalData {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

interface ActionModalContextType {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const ActionModalContext = createContext<ActionModalContextType | undefined>(undefined);

export function ActionModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setModalData(null), 300); // Wait for animation
  };

  return (
    <ActionModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalData && (
        <ActionModal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalData.title}
          description={modalData.description}
          actionText={modalData.actionText}
          onAction={modalData.onAction}
        />
      )}
    </ActionModalContext.Provider>
  );
}

export function useActionModal() {
  const context = useContext(ActionModalContext);
  if (context === undefined) {
    throw new Error("useActionModal must be used within an ActionModalProvider");
  }
  return context;
}
