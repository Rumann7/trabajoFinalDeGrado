import React, { useState, useEffect } from "react";
import CharacterSheet from "@/models/characterSheet";

interface ICharacterSheet {
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

interface CharacterDetailsProps {
  character: ICharacterSheet;
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

  const isDead = character.currHp === 0;

  return (
    <div className={`p-4 mt-20 rounded-lg shadow-xl max-w-md mx-auto ${isDead ? "bg-gray-900" : "bg-gray-800"}`}>
      <h2 className={`text-2xl font-bold mb-2 ${isDead ? "text-red-500" : "text-white"}`}>{character.name}</h2>
      <p className={`mb-2 ${isDead ? "text-red-400" : "text-gray-300"}`}>
        <span className="font-semibold">{character.race}</span>
      </p>
      <div className="mt-4 mb-4">
        {isDead ? (
          <div className="text-red-500 font-bold text-xl">{character.name} está muerto</div>
        ) : (
          <>
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
          </>
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
            className={`text-center p-1 rounded-lg ${isDead ? "bg-gray-800" : "bg-gray-700"}`}
          >
            <div className={`text-2xl ${isDead ? "text-red-400" : "text-white"}`}>
              {stat.bonus >= 0 ? `+${stat.bonus}` : stat.bonus}
            </div>
            <div className={`text-xs ${isDead ? "text-red-300" : "text-gray-300"}`}>{stat.value}</div>
            <div className={`text-xxs ${isDead ? "text-red-200" : "text-gray-400"}`}>{stat.name}</div>
          </div>
        ))}
      </div>
      {!isDead && (
        <button
          className="w-full mt-3 bg-blue-700 shadow text-white font-bold py-2 px-4 rounded-md mr-2 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
          onClick={handleUpdate}
        >
          Confirmar cambios
        </button>
      )}
    </div>
  );
};

export default CharacterDetails;
