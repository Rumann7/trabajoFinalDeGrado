import React from "react";
import Image from "next/image";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-center items-center">
          <Image
            src={"/images/attending.jpg"}
            alt="Imagen esqueleto atendiendo"
            height={500}
            width={450}
            className="border-2 rounded mt-5"
          />
        </div>
        <div className="my-4 border-2 bg-black p-3 font-papyrus text-white">
          <p>¿ASÍ QUE QUIERES ELIMINAR</p>
          <p>ESTA SALA PRECISAMENTE?</p>
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
