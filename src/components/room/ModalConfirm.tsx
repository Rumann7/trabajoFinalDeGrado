import React from "react";

interface ModalConfirmProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  characterId: string;
  roomId: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  characterId,
  roomId,
}) => {
  const handleConfirmRemove = async () => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csID: characterId }),
      });

      if (!response.ok) throw new Error("Error removing character");

      onConfirm();
    } catch (error) {
      console.error(`Error removing character: ${error}`);
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 text-white">
      <div className="bg-gray-800 p-6 rounded-md shadow-3xl max-w-lg mx-auto">
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
            onClick={handleConfirmRemove}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
