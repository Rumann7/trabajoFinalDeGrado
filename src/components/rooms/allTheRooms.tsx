import React, { useState, useEffect } from "react";
import NotUrRoom from "./notUrRoom";
import LoadingWizard from "../loadingWizard";
import Image from "next/image";

interface Room {
  _id: string;
  name: string;
  characterSheets: any[]; // Define el tipo adecuado para characterSheets si lo sabes
}

export default function AllTheRooms() {
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true);
      try {
        const response = await fetch("/api/rooms");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data);
        setRooms(data || []);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
        setError("Error fetching rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between text-white items-center mb-8 pt-20">
        <h1 className="text-2xl font-semibold">Salas disponibles</h1>
        <p> (Haz click para meterte en una sala) </p>
        <input
          type="text"
          placeholder="Buscar sala"
          value={searchTerm}
          onChange={handleSearchChange}
          className="appearance-none border rounded py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 shadow-md"
        />
      </div>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <LoadingWizard />
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center">
              <Image
                src={"/images/skeleton.png"}
                alt="Imagen Dungeon Master 1"
                height={300}
                width={300}
                className="border-2 rounded mt-5" // Estilos de borde y esquinas redondeadas
              />
            </div>
            <div className="my-4 text-align-center border-2 bg-black p-3 font-papyrus text-white text-2xl">
              ¡VAYA, NO HAY RESULTADOS!
            </div>
          </div>
        </div>
      ) : (
        <div
          className="grid lg:grid-cols-2 grid-cols-1 my-5 gap-2 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 12rem)", paddingBottom: "20px" }}
        >
          {filteredRooms.map((room) => (
            <NotUrRoom
              key={room._id}
              code={room._id}
              name={room.name}
              characters={room.characterSheets.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
