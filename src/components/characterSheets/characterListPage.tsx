"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Character from "./character";
import LoadingWizard from "../loadingWizard";

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
    <>
      {loading ? (
        <LoadingWizard />
      ) : error ? (
        <div className="text-center text-red-500 py-4">Error: {error}</div>
      ) : (
        <>
          <div className="flex justify-between text-white items-center mb-8 pt-28">
            <h1 className="text-2xl font-semibold">Tus personajes</h1>
            <Link
              href="/add-character"
              className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            >
              Añadir personaje
            </Link>
          </div>
          <div
            className="grid lg:grid-cols-2 grid-cols-1 my-5 gap-2 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 12rem)", paddingBottom: "20px" }}
          >
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
        </>
      )}
    </>
  );
}

export default CharacterListPage;
