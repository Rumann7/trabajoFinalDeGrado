import React from "react";
import Image from "next/image";

interface ModalProps {
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
  onClose: () => void; // Esta función se pasará desde el componente padre
}

const Modal: React.FC<ModalProps> = ({
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
  onClose,
}) => {
  // Calcula el porcentaje de vida restante
  const hpPercentage = (currHp / hpMax) * 100;
  // Define el color de la barra de vida en función del porcentaje de vida restante
  let hpColor: string;
  if (hpPercentage <= 25) {
    hpColor = "bg-red-500";
  } else if (hpPercentage <= 50) {
    hpColor = "bg-yellow-500";
  } else {
    hpColor = "bg-green-500";
  }

  let dangerMessage = "";

  return (
    <div className="fixed text-white inset-0 flex items-center justify-center z-70">
      <div
        className="absolute inset-0 bg-gray-900 opacity-70"
        onClick={onClose}
      ></div>
      <div className="bg-gray-800 rounded-md z-50 p-6 w-96">
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <h3 className="text-lg mb-4">{race}</h3>
        {currHp > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  name: "Fuerza",
                  value: strength,
                  bonus: bonusStrength,
                },
                {
                  name: "Destreza",
                  value: dexterity,
                  bonus: bonusDexterity,
                },
                {
                  name: "Constitución",
                  value: constitution,
                  bonus: bonusConstitution,
                },
                {
                  name: "Inteligencia",
                  value: intelligence,
                  bonus: bonusIntelligence,
                },
                {
                  name: "Sabiduría",
                  value: wisdom,
                  bonus: bonusWisdom,
                },
                {
                  name: "Carisma",
                  value: charisma,
                  bonus: bonusCharisma,
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
            <div className="mt-4 mb-4">
              <div className="text-white">
                <span className="text-lg text-center font-bold">{currHp}</span>/
                {hpMax}
              </div>
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
          </>
        ) : (
          <div className="text-red-500 text-center font-bold">
            <p>{name} está muerto</p>
            <Image
              src="/images/skeletoff.png"
              alt="Imagen Dungeon Master 1"
              height={300}
              width={300}
              className="border rounded mt-5 mx-auto" // Añadí "mx-auto" para centrar horizontalmente
            />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 mx-2 text-white transition font-bold rounded duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
