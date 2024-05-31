import React from "react";

interface chProps {
  name: string;
  race: string;
  currHp: number;
  hpMax: number;
  objectId: string; // Asegúrate de incluir el objectId
  onAddCharacter: (id: string) => void; // Añadir prop para manejar el clic
}

const YourCharacter: React.FC<chProps> = ({
  name,
  race,
  currHp,
  hpMax,
  objectId,
  onAddCharacter,
}) => {
  const hpPercentage = (currHp / hpMax) * 100;
  let hpColor: string;
  let dangerMessage: string | null = null;

  if (hpPercentage <= 25) {
    hpColor = "bg-red-400";
    dangerMessage = "¡peligro!";
  } else if (hpPercentage <= 50) {
    hpColor = "bg-yellow-400";
  } else {
    hpColor = "bg-green-400";
  }

  return (
    <button
      onClick={() => onAddCharacter(objectId)} // Llamar al método onAddCharacter con objectId
      className="bg-gray-700 mx-2 shadow-lg p-4 my-3 rounded-lg transition duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold mb-2 text-white">{name}</h1>
          {dangerMessage && (
            <span className="text-red-500 font-bold ml-2">{dangerMessage}</span>
          )}
        </div>
        <p className="text-gray-300">{race}</p>
        <p className="text-gray-300">
          HP:{" "}
          <span
            className={`font-bold ${hpColor.replace("bg", "text")} text-xl`}
          >
            {currHp}
          </span>
          /{hpMax}
        </p>
        <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
          <div
            className={`h-2.5 ${hpColor} rounded-full`}
            style={{
              width: `${hpPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    </button>
  );
};

export default YourCharacter;
