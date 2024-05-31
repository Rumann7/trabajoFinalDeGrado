import React from "react";
import Image from "next/image";

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-900 opacity-70"
        onClick={onCancel} // Aquí se llama a onCancel para cerrar el modal
      ></div>
      <div className="bg-gray-900 rounded-md z-50 p-6 relative">
        <h1 className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <Image
              src={"/images/thinkingSkeleton.jpg"}
              alt="Imagen esqueleto medio descompuesto"
              height={800}
              width={300}
              className="border-2 rounded mt-5"
            />
          </div>
          <div className="my-4 text-align-center border-2 bg-black p-3 font-papyrus text-white">
            <p>¿ESTAS SEGURO DE QUE QUIERES</p> 
            <p>QUITAR ESTE PERSONAJE?</p>
          </div>
        </h1>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md mr-2 transition duration-300 hover:bg-red-700 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            onClick={handleConfirmRemove}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-600 ease-in-out transform hover:bg-blue-700 hover:scale-105"
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
