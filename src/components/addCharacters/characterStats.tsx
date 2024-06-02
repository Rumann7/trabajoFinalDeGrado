import React from "react";

interface CharacterStatsProps {
  diceValues: number[];
  statValues: { [key: string]: number };
  setStatValues: (stat: string, value: number) => void;
  rollDice: () => void;
  diceRolled: boolean;
  statNames: string[];
}

const CharacterStats: React.FC<CharacterStatsProps> = ({
  diceValues,
  statValues,
  setStatValues,
  rollDice,
  diceRolled,
  statNames,
}) => {

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, stat: string) => {
    setStatValues(stat, Number(e.target.value));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        {diceValues.map((value, index) => (
          <div
            key={index}
            className="flex flex-col shadow rounded p-2 bg-gray-700 items-center mr-4"
          >
            <span className="font-bold">Dado {index + 1}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between">
        {statNames.map((stat, index) => (
          <div key={index} className="flex flex-col shadow rounded p-2 bg-gray-700 items-center mr-4 mb-4">
            <span className="font-bold">{stat}</span>
            <select
              value={statValues[stat.toLowerCase()]}
              onChange={(e) => handleSelectChange(e, stat.toLowerCase())}
              className="mt-2 p-1 bg-gray-800 text-white rounded"
            >
              <option value={0} disabled>Seleccionar</option>
              {diceValues.map((value, idx) => (
                <option key={idx} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterStats;
