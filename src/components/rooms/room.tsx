import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RoomProps {
  code: string;
  name: string;
  characters: number;
}

const Room: React.FC<RoomProps> = ({ code, name, characters }) => {
  const router = useRouter();
  const handleDelete = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation(); // Evita que el evento del botón se propague al div contenedor
    if (window.confirm("¿Seguro que quieres borrar esta sala?")) {
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
      }
    }
  };

  return (
    <Link
      href={`/dashboard/room/${code}`}
      className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer relative"
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-white hover:text-red-500"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m14 0a2 2 0 01-2 2H7a2 2 0 01-2-2m14 0H5m6 4v6m4-6v6M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2"
          />
        </svg>
      </button>
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <p>Participantes: {characters}</p>
    </Link>
  );
};

export default Room;
