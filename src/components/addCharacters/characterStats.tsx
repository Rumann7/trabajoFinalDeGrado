import React from "react";

interface CharacterStatsProps {
  diceValues: number[];
  rollDice: () => void;
  diceRolled: boolean;
}

const CharacterStats: React.FC<CharacterStatsProps> = ({
  diceValues,
  rollDice,
  diceRolled,
}) => (
  <div>
    <div className="flex justify-between">
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
  </div>
);

export default CharacterStats;
