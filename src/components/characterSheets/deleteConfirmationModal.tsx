// components/ConfirmationModal.tsx
import React from 'react';
import Image from "next/image";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex justify-center items-center">
          <Image
            src={"/images/skeletonBussinessMan.jpg"}
            alt="Imagen esqueleto medio descompuesto"
            height={500}
            width={450}
            className="border-2 rounded mt-5"
          />
        </div>
        <div className="my-4 border-2 bg-black p-3 font-papyrus text-white">
          <p>¿ESTÁS SEGURO DE QUE QUIERES</p>
          <p>ELIMINAR A ESTE PERSONAJE?</p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded mr-2 transform transition-transform duration-300 hover:scale-105"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded transform transition-transform duration-300 hover:scale-105"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
