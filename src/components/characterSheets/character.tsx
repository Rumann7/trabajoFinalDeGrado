import React from "react";

interface CharacterProps {
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

const Character: React.FC<CharacterProps> = ({
  name,
  race,
  hpMax,
  currHp,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  bonusStrength,
  bonusDexterity,
  bonusConstitution,
  bonusIntelligence,
  bonusWisdom,
  bonusCharisma,
}) => {
  return (
    <div className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <h3 className="text-lg mb-4">{race}</h3>
      <div className="flex flex-row">
        <div className="mr-4">
          <h2 className="text-xl font-bold">
            {bonusStrength >= 0 ? `+${bonusStrength}` : bonusStrength}
          </h2>
          <p className="text-xs">Fuerza</p>
        </div>
        <div className="mr-4">
          <h2 className="text-xl font-bold">
            {bonusDexterity >= 0 ? `+${bonusDexterity}` : bonusDexterity}
          </h2>
          <p className="text-xs">Destreza</p>
        </div>
        <div className="mr-4">
          <h2 className="text-xl font-bold">
            {bonusConstitution >= 0
              ? `+${bonusConstitution}`
              : bonusConstitution}
          </h2>
          <p className="text-xs">Constitución</p>
        </div>
        <div className="mr-4">
          <h2 className="text-xl font-bold">
            {bonusIntelligence >= 0
              ? `+${bonusIntelligence}`
              : bonusIntelligence}
          </h2>
          <p className="text-xs">Inteligencia</p>
        </div>
        <div className="mr-4">
          <h2 className="text-xl font-bold">
            {bonusWisdom >= 0 ? `+${bonusWisdom}` : bonusWisdom}
          </h2>
          <p className="text-xs">Sabiduría</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">
            {bonusCharisma >= 0 ? `+${bonusCharisma}` : bonusCharisma}
          </h2>
          <p className="text-xs">Carisma</p>
        </div>
      </div>
    </div>
  );
};

export default Character;
