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
  const hpPercentage = (currHp / hpMax) * 100;
  let hpColor: string;
  let dangerMessage: string | null = null;
  let characterClass = "bg-gray-700";

  if (currHp <= 0) {
    dangerMessage = "¡Muerto!";
    hpColor = "bg-gray-500";
    characterClass = "bg-gray-900 text-red-500";
  } else if (hpPercentage <= 25) {
    hpColor = "bg-red-500";
    dangerMessage = "¡Peligro!";
    characterClass = "bg-gray-800 text-red-400";
  } else if (hpPercentage <= 50) {
    hpColor = "bg-yellow-500";
  } else {
    hpColor = "bg-green-500";
  }

  return (
    <div
      className={`${characterClass} mx-2 shadow-xl hover:bg-gray-800 hover:scale-105 duration-300 p-4 my-3 rounded-lg shadow-right relative cursor-pointer`}
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
        <h1 className="text-2xl pr-5 font-bold">{name}</h1>
      </div>
      {dangerMessage ? (
        <div className="font-bold">{dangerMessage}</div>
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
        </>
      )}
      {(currHp > 0 || dangerMessage === "¡Peligro!") && (
        <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
          <div
            className={`${hpColor} h-2.5 rounded-full transition-width duration-200`}
            style={{ width: `${hpPercentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Character;
