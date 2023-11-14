import ConfirmModal from '@/components/Modals/ConfirmModal';
import { ModalPageDetails } from '@/types';
import { createContext, useContext, useState } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  pageDetails: ModalPageDetails;
  openModal: (isOpen: boolean, pageDetails?: ModalPageDetails) => void;
}

const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  pageDetails: {},
  openModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageDetails, setPageDetails] = useState({}); // Keep the active page details in context for handlers

  const openModal = (isOpen: boolean, activePage?: ModalPageDetails) => {
    setIsOpen(isOpen);
    activePage && setPageDetails(activePage);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen: isOpen, openModal, pageDetails }}>
      {children}
      <ConfirmModal />
    </ModalContext.Provider>
  );
};
