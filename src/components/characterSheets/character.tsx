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
  onDelete: () => void;
  onClick: () => void;
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
      className="bg-gray-700 shadow-lg text-white rounded-lg p-3 m-1 hover:bg-gray-800 cursor-pointer relative"
      onClick={handleOnClick}
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
          className="bi bi-trash cursor-pointer hover:text-red-500"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 5.5A.5.5 0 0 1 3 5h10a.5.5 0 0 1 .5.5V7H2V5.5zm11.5-2a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1h1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h1zM6 7V6h4v1H6zm1-5h2v1H7V2z"
          />
        </svg>
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
        <p className="text-center text-red-500 font-bold text-xl">
          {name} está muerto{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            className="bi bi-skull"
            viewBox="0 0 16 16"
            style={{ display: "inline-block", verticalAlign: "middle" }}
          >
            <path d="M8 0a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8zM4.285 1.567a7.004 7.004 0 0 1 3.715-1.089 7.004 7.004 0 0 1 3.715 1.089A7.05 7.05 0 0 1 12.95 7.82a4.004 4.004 0 0 0-.95-.822 4.004 4.004 0 0 0-1.45-.578A4.006 4.006 0 0 0 8 6a4.006 4.006 0 0 0-2.55 1.42 4.004 4.004 0 0 0-1.45.578 4.004 4.004 0 0 0-.95.822 7.05 7.05 0 0 1 1.235-5.254zM8 14.5a6.963 6.963 0 0 1-5.858-3.334c.177-.035.358-.054.54-.058.505.005.993.122 1.428.337A5.019 5.019 0 0 0 8 12a5.019 5.019 0 0 0 3.89-1.555c.435-.215.923-.332 1.428-.337.182.004.363.023.54.058A6.963 6.963 0 0 1 8 14.5zM4.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-5 2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0v-2zm2 0a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0v-2z" />
          </svg>
        </p>
      )}
    </div>
  );
};

export default Character;
