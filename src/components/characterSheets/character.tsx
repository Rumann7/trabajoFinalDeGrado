import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  onDelete: () => void;
  onClick: () => void;
  deleteIcon: React.ReactNode;
}

const Character: React.FC<CharacterProps> = ({
  id,
  name,
  race,
  hpMax,
  currHp,
  bonusStrength,
  bonusDexterity,
  bonusConstitution,
  bonusIntelligence,
  bonusWisdom,
  bonusCharisma,
  onDelete,
  onClick,
  deleteIcon
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClick = () => {
    setIsModalOpen(true);
    onClick();
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Detiene la propagación para que no se active el onClick del contenedor
    onDelete();
  };

  const hpPercentage = (currHp / hpMax) * 100;
  let hpColor: string;
  let dangerMessage: string | null = null;

  if (hpPercentage <= 25) {
    hpColor = "bg-red-500";
    dangerMessage = "¡Peligro!";
  } else if (hpPercentage <= 50) {
    hpColor = "bg-yellow-500";
  } else {
    hpColor = "bg-green-500";
  }

  return (
    <div
      className={`bg-gray-700 shadow-lg text-white rounded-lg p-3 m-1 hover:bg-gray-800 cursor-pointer relative ${
        currHp <= 0 ? "bg-opacity-50 border-4 border-red-600 animate-pulse" : ""
      } ${hpPercentage <= 25 && currHp > 0 ? "bg-opacity-75 border-2 border-yellow-600 animate-pulse" : ""}`}
      onClick={handleOnClick}
    >
      <div className="absolute top-2 right-2">
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-xl hover:text-red-500 transition-colors duration-200">
          {deleteIcon || <FontAwesomeIcon icon={faTrash} />}
        </button>
      </div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">
          {name}
          {dangerMessage && currHp > 0 && (
            <span className="text-red-500 font-bold ml-2 text-sm">
              {dangerMessage}
            </span>
          )}
        </h1>
      </div>
      <h3 className="text-lg mb-4">{race}</h3>
      <div className="flex flex-row mb-4">
        {[
          { value: bonusStrength, label: "Fuerza" },
          { value: bonusDexterity, label: "Destreza" },
          { value: bonusConstitution, label: "Constitución" },
          { value: bonusIntelligence, label: "Inteligencia" },
          { value: bonusWisdom, label: "Sabiduría" },
          { value: bonusCharisma, label: "Carisma" },
        ].map((attr, index) => (
          <div
            key={index}
            className="flex flex-col items-center mr-4 last:mr-0"
          >
            <h2 className="text-xl font-bold">
              {attr.value >= 0 ? `+${attr.value}` : attr.value}
            </h2>
            <p className="text-xs">{attr.label}</p>
          </div>
        ))}
      </div>
      {currHp > 0 ? (
        <>
          <div className="w-full bg-gray-600 rounded-full h-4 mb-2">
            <div
              className={`${hpColor} h-4 rounded-full transition-width duration-200`}
              style={{ width: `${hpPercentage}%` }}
            ></div>
          </div>
          <p className="text-center">
            HP:
            <span
              className={`font-bold ${hpColor.replace("bg", "text")} text-xl`}
            >
              {currHp}
            </span>
            /{hpMax}
          </p>
        </>
      ) : (
        <p className="text-center text-red-500 font-bold text-2xl animate-bounce">
          {name} está muerto{" "}
          <FontAwesomeIcon icon={faSkull}/>
        </p>
      )}
    </div>
  );
};

export default Character;
