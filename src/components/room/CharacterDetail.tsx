// @/components/room/characterDetails.tsx

import React, { useState, useEffect } from "react";
import CharacterSheet from "@/models/characterSheet";

interface CharacterDetailsProps {
  character: CharacterSheet;
  onUpdateHp: (id: string, newHp: number) => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onUpdateHp,
}) => {
  const [newHp, setNewHp] = useState(character.currHp);

  useEffect(() => {
    setNewHp(character.currHp);
  }, [character.currHp]);

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNewHp(
      value >= 0 ? (value <= character.hpMax ? value : character.hpMax) : 0
    );
  };

  const handleUpdate = () => {
    onUpdateHp(character._id, newHp);
  };

  const hpPercentage = (newHp / character.hpMax) * 100;
  let hpColor = "bg-green-500";
  let dangerMessage = "";

  if (hpPercentage <= 50) hpColor = "bg-yellow-500";
  if (hpPercentage <= 25) {
    hpColor = "bg-red-500";
    dangerMessage = "Peligro: ¡HP muy bajo!";
  }

  return (
    <div className="bg-gray-800 p-4 mt-20 rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-2">{character.name}</h2>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold">{character.race}</span>
      </p>
      <div className="mt-4 mb-4">
        <div className="text-white">
          <span className="text-lg font-bold">{newHp}</span>/{character.hpMax}
        </div>
        <input
          type="number"
          className="appearance-none border rounded-md w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 shadow-md"
          value={newHp}
          onChange={handleHpChange}
        />
        <div className="relative w-full h-3 bg-gray-700 rounded mt-2">
          <div
            className={`absolute top-0 left-0 h-full rounded ${hpColor}`}
            style={{ width: `${Math.min(hpPercentage, 100)}%` }}
          ></div>
        </div>
        {dangerMessage && (
          <p className="text-red-500 mt-2 text-sm">{dangerMessage}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          {
            name: "Fuerza",
            value: character.strength,
            bonus: character.bonusStrength,
          },
          {
            name: "Destreza",
            value: character.dexterity,
            bonus: character.bonusDexterity,
          },
          {
            name: "Constitución",
            value: character.constitution,
            bonus: character.bonusConstitution,
          },
          {
            name: "Inteligencia",
            value: character.intelligence,
            bonus: character.bonusIntelligence,
          },
          {
            name: "Sabiduría",
            value: character.wisdom,
            bonus: character.bonusWisdom,
          },
          {
            name: "Carisma",
            value: character.charisma,
            bonus: character.bonusCharisma,
          },
        ].map((stat) => (
          <div
            key={stat.name}
            className="text-center bg-gray-700 p-1 rounded-lg"
          >
            <div className="text-2xl text-white">
              {stat.bonus >= 0 ? `+${stat.bonus}` : stat.bonus}
            </div>
            <div className="text-gray-300 text-xs">{stat.value}</div>
            <div className="text-gray-400 text-xxs">{stat.name}</div>
          </div>
        ))}
      </div>
      <button
        className="w-full mt-3 bg-blue-700 shadow text-white font-bold py-2 px-4 rounded-md mr-2 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
        onClick={handleUpdate}
      >
        Confirmar cambios
      </button>
    </div>
  );
};

export default CharacterDetails;
