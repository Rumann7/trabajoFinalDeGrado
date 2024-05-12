"use client";

import CharacterForm from "@/components/addCharacters/characterForm";

export default function AddCharacter() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="p-10 rounded-lg bg-gray-800 text-white shadow-xl">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Crear personaje</h1>
          <CharacterForm />
        </div>
      </div>
    </div>
  );
}
