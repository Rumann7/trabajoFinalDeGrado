"use client";

import { useSession } from "next-auth/react";
import LoadingWizard from "../loadingWizard";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Room from "./room";

interface Room {
  _id: string;
  characterSheets: any;
  code: string;
  name: string;
  participants: number;
}

function RoomListPage() {
  const { data: session, status } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchRooms() {
      if (!session?.user?.email) return;
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users/getRooms/${session.user.email}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setRooms(data.salas || []);
      } catch (error) {
        setError(`Error fetching rooms: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [session]);

  return (
    <>
      {loading ? (
        <LoadingWizard />
      ) : error ? (
        <div className="text-center text-red-500 py-4">Error: {error}</div>
      ) : rooms.length > 0 ? (
        <>
          <div className="flex justify-between text-white items-center mb-8 pt-20">
            <h1 className="text-2xl font-semibold">Tus salas</h1>
            <Link
              href="/dashboard/add-sala"
              className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            >
              Crear Sala
            </Link>
          </div>
          <div
            className="grid lg:grid-cols-3 grid-cols-1 my-5 gap-2 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 12rem)", paddingBottom: "20px" }}
          >
            {rooms.map((sal, index) => (
              <Room
                key={index}
                name={sal.name}
                code={sal._id}
                characters={sal.characterSheets.length}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center">
              <Image
                src="/images/skeleton.png"
                alt="Imagen Dungeon Master 1"
                height={300}
                width={300}
                className="border rounded mt-5" // Estilos de borde y esquinas redondeadas
              />
            </div>
            <div className="my-4 border-2 bg-black rounded p-3 font-papyrus text-white text-2xl">
              ¡VAYA, NO TIENES SALAS CREADAS!
            </div>
            <Link
              href="/dashboard/add-sala"
              className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            >
              Crear sala
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default RoomListPage;
