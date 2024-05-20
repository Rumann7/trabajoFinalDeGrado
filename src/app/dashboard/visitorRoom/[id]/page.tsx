"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CharacterVisitListPage from "@/components/visitorRoom/roomCharacter";
import LoadingWizard from "@/components/loadingWizard";
import RoomCharacter from "@/components/visitorRoom/roomCharacter";
import CharacterModal from "@/components/room/modal";
import Modal from "@/components/characterSheets/modal";

interface Character {
  _id: string;
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
interface Room {
  name: string;
  lore: string;
  characterSheets: Character[];
}

// @/app/visitorRoom/[id]/page.tsx
// Import statements and interfaces remain the same

export default function visitorRoom() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    async function fetchRoom() {
      setLoading(true);
      try {
        const response = await fetch(`/api/rooms/${params.id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setRoom(data);
      } catch (error) {
        setError(`Error fetching room: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchRoom();
    }
  }, [params.id]);

  const addCharacter = () => {
    setIsAddCharacterModalOpen(true);
  };

  const closeAddCharacterModal = () => {
    setIsAddCharacterModalOpen(false);
  };

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  if (loading) return <LoadingWizard />;
  if (error) return <p>{error}</p>;

  return (
    <div className="h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-40 h-full">
        {isAddCharacterModalOpen && (
          <CharacterModal
            closeModal={closeAddCharacterModal}
            roomId={params.id}
          />
        )}
        {room && room?.characterSheets.length > 0 ? (
          <>
            <div className="flex justify-between text-white items-center mb-8 pt-28">
              <h1 className="text-2xl font-semibold">{room?.name}</h1>
              <button
                className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                onClick={addCharacter}
              >
                Añadir personaje
              </button>
            </div>
            <div
              className="grid lg:grid-cols-2 grid-cols-1 my-5 gap-2 overflow-y-auto"
              style={{
                maxHeight: "calc(100vh - 12rem)",
                paddingBottom: "20px",
              }}
            >
              {room.characterSheets.map((char, index) => (
                <RoomCharacter
                  key={index}
                  id={char._id}
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
            <h1 className="flex flex-col items-center">
              <div className="flex justify-center items-center">
                <Image
                  src={"/images/damagedSkeleton.jpeg"}
                  alt="Imagen esqueleto medio descompuesto"
                  height={300}
                  width={300}
                  className="border-2 rounded mt-5" // Estilos de borde y esquinas redondeadas
                />
              </div>
              <div className="my-4 text-align-center border-2 bg-black p-3 font-papyrus text-white text-2xl">
                <p>¡NYEEAAARGH! ¡NO HAY PERSONAJES EN ESTA SALA,</p>
                <p>TENDRÁS QUE SER TÚ EL QUE LEVANTE ESTA MALDICIÓN!</p>
              </div>
              <button
                onClick={addCharacter}
                className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
              >
                Añadir personaje
              </button>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
