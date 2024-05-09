"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDraggable } from "@dnd-kit/core";

export default function AddCharacter() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [diceRolled, setDiceRolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    hpMax: 0,
    currHp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    bonusStrength: 0,
    bonusDexterity: 0,
    bonusConstitution: 0,
    bonusIntelligence: 0,
    bonusWisdom: 0,
    bonusCharisma: 0,
  });
  const [diceValues, setDiceValues] = useState<number[]>(
    Array.from({ length: 6 }, () => 0)
  );

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "hpMax" && { currHp: value }), // Asegura que currHp siempre es igual a hpMax
    }));
  };

  const rollDice = () => {
    const results = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 20) + 1
    );
    setFormData((prev) => ({
      ...prev,
      strength: results[0],
      dexterity: results[1],
      constitution: results[2],
      intelligence: results[3],
      wisdom: results[4],
      charisma: results[5],
      bonusStrength: Math.floor((results[0] - 10) / 2),
      bonusDexterity: Math.floor((results[1] - 10) / 2),
      bonusConstitution: Math.floor((results[2] - 10) / 2),
      bonusIntelligence: Math.floor((results[3] - 10) / 2),
      bonusWisdom: Math.floor((results[4] - 10) / 2),
      bonusCharisma: Math.floor((results[5] - 10) / 2),
    }));
    setDiceValues(results);
    setDiceRolled(true); // Marcamos que se lanzaron los dados
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/users/getCharacters/${session?.user?.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      router.push("/dashboard/characterList");
    } catch (error) {
      console.error("Error adding character:", error);
    }
  };

  const handleCancel = () => {
    router.back(); // Devuelve a la página anterior
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Crear personaje</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 focus:bg-white shadow-inner"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="race"
                value={formData.race}
                onChange={handleChange}
                placeholder="Raza"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 focus:bg-white shadow-inner"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-2">HP:</label>
              <input
                type="number"
                name="hpMax"
                value={formData.hpMax}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 focus:bg-white shadow-inner"
                required
              />
            </div>
            <div className="flex">
              {diceValues.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col shadow rounded p-2 bg-gray-100 items-center mr-4"
                >
                  <span className="font-bold">Dado {index + 1}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <div>
                <button
                  type="button"
                  onClick={rollDice}
                  disabled={diceRolled} // Deshabilitamos si ya se lanzaron los dados
                  className={`${
                    diceRolled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white font-bold mr-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200`}
                >
                  Tirar dados
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Añadir personaje
                </button>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
