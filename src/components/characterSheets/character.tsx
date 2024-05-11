import React, { useState } from "react";

interface CharacterProps {
  name: string;
  race: string;
  hpMax: number;
  currHp: number;
  bonusStrength: number;
  bonusDexterity: number;
  bonusConstitution: number;
  bonusIntelligence: number;
  bonusWisdom: number;
  bonusCharisma: number;
  onClick: () => void;
}

const Character: React.FC<CharacterProps> = ({
  name,
  race,
  bonusStrength,
  bonusDexterity,
  bonusConstitution,
  bonusIntelligence,
  bonusWisdom,
  bonusCharisma,
  onClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal y ejecutar la función onClick
  const handleOnClick = () => {
    setIsModalOpen(true); // Abrir el modal
    onClick(); // Ejecutar la función onClick
  };

  return (
    <div
      className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer"
      onClick={handleOnClick} // Asignamos la función handleOnClick al evento onClick
    >
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
