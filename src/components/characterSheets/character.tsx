import React, { useState } from "react";

interface CharacterProps {
  id: string;
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
  id,
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

  const handleDelete = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation(); // Previene que el evento de clic se propague al contenedor padre
    try {
      const res = await fetch(`/api/character/${id}`, {
        method: "DELETE",
      });
      location.reload();
    } catch (error) {
      console.error("Error al eliminar el personaje:", error);
    }
  };

  return (
    <div
      className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer relative"
      onClick={handleOnClick} // Asignamos la función handleOnClick al evento onClick
    >
      <div
        onClick={handleDelete}
        className="absolute top-1 right-1 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4H2.5a1 1 0 110-2h11a1 1 0 011 1zM11 4H5v9a1 1 0 001 1h4a1 1 0 001-1V4z"
          />
          <path d="M5.5 2a.5.5 0 00-.5.5V3h6v-.5a.5.5 0 00-1 0V3H6v-.5a.5.5 0 00-.5-.5z" />
        </svg>
      </div>
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
