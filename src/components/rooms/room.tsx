import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmDeleteModal";

interface RoomProps {
  code: string;
  name: string;
  characters: number;
}

const Room: React.FC<RoomProps> = ({ code, name, characters }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/rooms/${code}`, {
        method: "DELETE",
      });
      if (res.ok) {
        location.reload(); // Recarga la página
      } else {
        throw new Error("Failed to delete the room");
      }
    } catch (error) {
      console.error("Error al eliminar el aula:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={() => router.push(`/dashboard/room/${code}`)}
        className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer relative"
      >
        <button
          onClick={handleModalOpen}
          className="absolute top-2 right-2 text-white hover:text-red-500"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faTrash} className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <p>Participantes: {characters}</p>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Room;
