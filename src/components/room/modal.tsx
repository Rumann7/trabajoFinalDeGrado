// @/components/room/modal.tsx

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import YourCharacter from "./yourCharacter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Character {
  _id: string;
  name: string;
  race: string;
  hpMax: number;
  currHp: number;
}

export default function CharacterModal({
  closeModal,
  roomId, 
}: {
  closeModal: () => void;
  roomId: string;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCharacters() {
      if (!session?.user?.email) return;
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users/getCharacters/${session.user.email}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCharacters(data.characters || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [session]);

  const handleAddCharacter = async (characterId: string) => {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csID: characterId }),
      });
      console.log(characterId);

      if (!response.ok) throw new Error("Error al agregar personaje");

      const data = await response.json();
      console.log("Personaje agregado: ", data);
      closeModal();
      location.reload();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-md shadow-3xl">
        <h2 className="text-xl font-bold mb-4">Añadir Personaje</h2>
        <input
          type="text"
          placeholder="Buscar personaje..."
          className="appearance-none border rounded-md w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 shadow-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <div className="flex justify-center p-5 m-10 bg-gray-600 rounded-lg shados-lg items-center">
            <div className="flex flex-col items-center">
              <Image
                src="/images/walkingWizard.gif"
                alt="Loading..."
                height={100}
                width={100}
              />
              <div className="mt-4 font-serif text-white text-2xl">
                Conjurando...
              </div>
            </div>
          </div>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 overflow-y-auto p-1 mt-3 border-t-2 border-b-2 bg-gray-600 border-blue-500 mt-2 overflow-y-auto w-64 h-96">
            {filteredCharacters.length === 0 ? (
              <div className="flex justify-center items-center">
                <h1 className="flex flex-col items-center">
                  <div className="flex justify-center items-center">
                    <Image
                      src={"/images/skeleton.png"}
                      alt="Imagen esqueleto medio descompuesto"
                      height={300}
                      width={150}
                      className="border-2 rounded mt-5"
                    />
                  </div>
                  <div className="my-4 text-align-center border-2 bg-black p-3 font-papyrus text-white">
                    <p>NO SE HAN ENCONTRADO PERSONAJES</p>
                  </div>
                </h1>
              </div>
            ) : (
              filteredCharacters.map((character, index) => (
                <YourCharacter
                  key={index}
                  name={character.name}
                  race={character.race}
                  currHp={character.currHp}
                  hpMax={character.hpMax}
                  objectId={character._id}
                  onAddCharacter={handleAddCharacter}
                />
              ))
            )}
          </div>
        )}
        <button
          className="bg-blue-500 shadow text-white py-2 p-4 rounded-lg my-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
