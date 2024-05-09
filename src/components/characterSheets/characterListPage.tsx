"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Character from "./character";

interface Character {
  name: string;
  race: string;
  hpMax: number;
  currHp: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  bonusStrength: number;
  bonusDexterity: number;
  bonusConstitution: number;
  bonusIntelligence: number;
  bonusWisdom: number;
  bonusCharisma: number;
}

function CharacterListPage() {
  const { data: session, status } = useSession();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    async function fetchCharacters() {
      if (!session?.user?.email) return; // Verificar que el email está disponible
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users/getCharacters/${session.user.email}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (!data.characters || data.characters.length === 0) {
          throw new Error("No characters found");
        }
        setCharacters(data.characters);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [session]);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32">
      <h1 className="text-xl font-semibold my-8">Character List</h1>
      <div className="flex justify-end mb-4">
        <Link
          href="/add-character"
          className="bg-gray-500 text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-gray-600"
        >
          Add Character
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">Error: {error}</div>
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 my-5 gap-2">
          {characters.map((char, index) => (
            <Character
              key={index}
              name={char.name}
              race={char.race}
              hpMax={char.hpMax}
              currHp={char.currHp}
              strength={char.strength}
              dexterity={char.dexterity}
              constitution={char.constitution}
              intelligence={char.intelligence}
              wisdom={char.wisdom}
              charisma={char.charisma}
              bonusStrength={char.bonusStrength}
              bonusDexterity={char.bonusDexterity}
              bonusConstitution={char.bonusConstitution}
              bonusIntelligence={char.bonusIntelligence}
              bonusWisdom={char.bonusWisdom}
              bonusCharisma={char.bonusCharisma}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CharacterListPage;
