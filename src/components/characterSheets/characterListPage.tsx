"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Character from "./character";
import LoadingWizard from "../loadingWizard";
import Image from "next/image";
import Modal from "./modal";

interface Character {
  objectId: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

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
        setCharacters(data.characters || []);
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
      ) : characters.length > 0 ? (
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
                bonusStrength={char.bonusStrength}
                bonusDexterity={char.bonusDexterity}
                bonusConstitution={char.bonusConstitution}
                bonusIntelligence={char.bonusIntelligence}
                bonusWisdom={char.bonusWisdom}
                bonusCharisma={char.bonusCharisma}
                onClick={() => openModal(char)}
              />
            ))}
            {isModalOpen && selectedCharacter && (
              <Modal
                id={selectedCharacter._id}
                name={selectedCharacter.name}
                race={selectedCharacter.race}
                hpMax={selectedCharacter.hpMax}
                currHp={selectedCharacter.currHp}
                strength={selectedCharacter.strength}
                dexterity={selectedCharacter.dexterity}
                constitution={selectedCharacter.constitution}
                intelligence={selectedCharacter.intelligence}
                wisdom={selectedCharacter.wisdom}
                charisma={selectedCharacter.charisma}
                bonusStrength={selectedCharacter.bonusStrength}
                bonusDexterity={selectedCharacter.bonusDexterity}
                bonusConstitution={selectedCharacter.bonusConstitution}
                bonusIntelligence={selectedCharacter.bonusIntelligence}
                bonusWisdom={selectedCharacter.bonusWisdom}
                bonusCharisma={selectedCharacter.bonusCharisma}
                onClose={() => setIsModalOpen(false)}
              />
            )}
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
              ¡VAYA, NO TIENES PERSONAJES CREADOS!
            </div>
            <Link
              href="/add-character"
              className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            >
              Añadir personaje
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CharacterListPage;
