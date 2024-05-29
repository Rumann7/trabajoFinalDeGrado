import React, { useState } from "react";

interface DieProps {
  type: string;
  onRoll: () => number;
}

const Die: React.FC<DieProps> = ({ type, onRoll }) => {
  const [value, setValue] = useState<number>(0);
  const [rolling, setRolling] = useState<boolean>(false);

  const rollDice = () => {
    if (rolling) return; // Prevenir clics si ya está rodando

    setRolling(true);
    const animationDuration = 1000; // Duración de la animación en milisegundos
    const interval = 30; // Intervalo entre actualizaciones en milisegundos

    const rollInterval = setInterval(() => {
      const interimResult = onRoll();
      setValue(interimResult);
    }, interval);

    setTimeout(() => {
      clearInterval(rollInterval);
      setRolling(false);
      const finalResult = onRoll();
      setValue(finalResult);
    }, animationDuration);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-semibold mb-1 text-white">{type}</h1>
      <div
        className={`rounded-lg shadow-2xl border-2 mx-5 h-16 w-16 flex justify-center items-center text-2xl font-bold cursor-pointer transform transition duration-300 hover:shadow-lg hover:border-gray-600 ${
          rolling ? "text-gray-400 bg-gray-200 cursor-not-allowed" : "text-gray-700 bg-white"
        } shadow-lg`}
        onClick={rollDice}
        style={{
          boxShadow: rolling ? "0 0 10px rgba(0, 0, 0, 0.2)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {value > 0 ? value : ""}
      </div>
    </div>
  );
};

export default Die;
