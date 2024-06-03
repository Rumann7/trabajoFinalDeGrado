"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingWizard from "@/components/loadingWizard";
import Character from "@/components/room/character";
import GameCenter from "@/components/room/gameCenter";
import Modal from "@/components/room/modal";
import CharacterDetails from "@/components/room/CharacterDetail";
import ModalConfirm from "@/components/room/ModalConfirm";
import UsersToInvite from "@/components/room/usersToInvite";

interface CharacterSheet {
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
  characterSheets: CharacterSheet[];
}

export default function RoomPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterSheet | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [characterToRemove, setCharacterToRemove] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchRoom() {
      setLoading(true);
      try {
        const response = await fetch(`/api/rooms/${params.id}`);
        if (!response.ok)
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );

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

  const handleRemoveCharacter = (characterId: string) => {
    setCharacterToRemove(characterId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmRemove = () => {
    setRoom((prevRoom) =>
      prevRoom
        ? {
            ...prevRoom,
            characterSheets: prevRoom.characterSheets.filter(
              (character) => character._id !== characterToRemove
            ),
          }
        : null
    );
    setSelectedCharacter(null);
    setIsConfirmModalOpen(false);
    setCharacterToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsConfirmModalOpen(false);
    setCharacterToRemove(null);
  };

  const handleUpdateHp = async (characterId: string, newHp: number) => {
    try {
      const response = await fetch(`/api/character/${characterId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currHp: newHp }),
      });

      if (!response.ok) throw new Error("Error updating character HP");

      const updatedCharacter = await response.json();
      setRoom((prevRoom) =>
        prevRoom
          ? {
              ...prevRoom,
              characterSheets: prevRoom.characterSheets.map((character) =>
                character._id === characterId ? updatedCharacter : character
              ),
            }
          : null
      );
      setSelectedCharacter(updatedCharacter);
    } catch (error) {
      setError(`Error updating character HP: ${error}`);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addCharacter = () => {
    setIsAddCharacterModalOpen(true);
  };

  const closeAddCharacterModal = () => {
    setIsAddCharacterModalOpen(false);
  };

  if (loading) return <LoadingWizard />;
  if (error) return <p>{error}</p>;

  const roomId = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside
        className={`bg-gray-800 text-white shadow-right transform transition-width duration-300 ease-in-out ${
          isSidebarOpen ? "w-56" : "w-0"
        } overflow-hidden lg:block`}
      >
        <div className="mt-24">
          <h1 className="m-6 font-bold text-4xl mb-4">{room?.name}</h1>
          <button
            className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded-md mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 mx-6"
            onClick={openModal}
          >
            Mostrar lore
          </button>
          <div className="p-1 mt-3 border-t-2 border-b-2 bg-gray-600 border-blue-500 widgets mt-2 overflow-y-auto h-96">
            {room?.characterSheets.map((sheet, index) => (
              <Character
                key={index}
                name={sheet.name}
                race={sheet.race}
                currHp={sheet.currHp}
                hpMax={sheet.hpMax}
                onRemoveCharacter={() => handleRemoveCharacter(sheet._id)}
                onClick={() => setSelectedCharacter(sheet)}
              />
            ))}
          </div>
          <button
            className="bg-blue-600 shadow w-full text-white font-bold py-3 px-4 hover:bg-blue-700 transition"
            onClick={addCharacter}
          >
            Añadir personaje
          </button>
        </div>
        {isSidebarOpen && (
          <button
            className="absolute bottom-0 left-0 w-full bg-gray-700 text-white py-3 px-4 rounded-b duration-300 ease-in-out transform hover:bg-gray-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            Cerrar
          </button>
        )}
      </aside>
      <div className="flex-1 flex">
        <GameCenter />
        {selectedCharacter ? (
          <div className="w-1/3 p-4">
            <CharacterDetails
              character={selectedCharacter}
              onUpdateHp={handleUpdateHp}
            />
          </div>
        ) : (
          <div className="p-4 mt-28 rounded-lg shadow-xl max-w-md mx-auto mr-6 mb-36 bg-gray-800 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Selecciona un personaje</h2>
            <p className="mb-4">
              Por favor, selecciona un personaje de la lista para ver sus
              detalles.
            </p>
            <div className="flex items-center justify-center h-48">
              <svg
                className="w-24 h-24 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 7v-8m0 0l-9-5m9 5l9-5-9 5z"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-gray-700 p-8 rounded-md shadow-3xl">
            <h2 className="text-xl font-bold mb-4">Lore</h2>
            <p>{room?.lore}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isAddCharacterModalOpen && (
        <Modal closeModal={closeAddCharacterModal} roomId={roomId} />
      )}
      {isConfirmModalOpen && (
        <ModalConfirm
          isOpen={isConfirmModalOpen}
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
          message="¿Estás seguro de que deseas eliminar este personaje?"
          characterId={characterToRemove || ""}
          roomId={roomId}
        />
      )}
      {!isSidebarOpen && (
        <button
          className="fixed bottom-4 left-4 bg-gray-900 text-white p-2 rounded-lg shadow-lg z-10"
          onClick={() => setIsSidebarOpen(true)}
        >
          Abrir
        </button>
      )}
      <UsersToInvite roomId={roomId} />
    </div>
  );
}
