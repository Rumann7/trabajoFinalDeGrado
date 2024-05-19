import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Character from "./character";
import YourCharacter from "./yourCharacter";

interface Character {
  objectId: string;
  roomId: string;
  name: string;
  race: string;
  hpMax: number;
  currHp: number;
}

export default function CharacterModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { data: session } = useSession();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-gray-700 p-8 rounded-md shadow-3xl">
        <h2 className="text-xl font-bold mb-4">Personajes</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="p-1 mt-3 border-t-2 border-b-2 bg-gray-600 border-blue-500 widgets mt-2 overflow-y-auto w-64 h-96">
            {characters.map((character) => (
              <YourCharacter
                key={character.objectId}
                name={character.name}
                race={character.race}
                currHp={character.currHp}
                hpMax={character.hpMax}
              />
            ))}
          </div>
        )}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
