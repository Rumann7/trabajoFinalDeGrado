// @/components/room/character.tsx

import React from "react";

interface chProps {
  name: string;
  race: string;
  currHp: number;
  hpMax: number;
  onRemoveCharacter: () => void;
  onClick: () => void;
}

const Character: React.FC<chProps> = ({
  name,
  race,
  currHp,
  hpMax,
  onRemoveCharacter,
  onClick,
}) => {
  // Calcula el porcentaje de vida restante
  const hpPercentage = (currHp / hpMax) * 100;
  // Define el color de la barra de vida en función del porcentaje de vida restante
  let hpColor: string;
  let dangerMessage: string | null = null;

  if (currHp <= 0) {
    // Si los puntos de vida son 0 o menos, mostrar el mensaje de "muerto"
    dangerMessage = "¡Muerto!";
  } else if (hpPercentage <= 25) {
    hpColor = "bg-red-500";
    dangerMessage = "¡Peligro!";
  } else if (hpPercentage <= 50) {
    hpColor = "bg-yellow-500";
  } else {
    hpColor = "bg-green-500";
  }

  return (
    <div
      className="bg-gray-700 mx-2 shadow-xl hover:bg-gray-800 hover:scale-105 duration-300 p-4 my-3 rounded-lg shadow-right relative cursor-pointer"
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemoveCharacter();
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-3xl"
      >
        &times;
      </button>
      <div className="items-center">
        <h1 className="text-2xl font-bold text-white">{name}</h1>
      </div>
      {dangerMessage ? (
        <div className="text-red-500 font-bold">{dangerMessage}</div>
      ) : (
        <>
          <p className="text-gray-300 mt-2">{race}</p>
          <p className="text-gray-300">
            HP:{" "}
            <span
              className={`font-bold ${hpColor.replace("bg", "text")} text-xl`}
            >
              {currHp}
            </span>
            /{hpMax}
          </p>
          {currHp > 0 && (
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
              <div
                className={`${hpColor} h-2.5 rounded-full transition-width duration-200`}
                style={{ width: `${hpPercentage}%` }}
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Character;
