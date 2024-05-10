// components/DiceRoller.tsx
type DiceRollerProps = {
  diceValues: number[];
  rollDice: () => void;
  diceRolled: boolean;
};

const DiceRoller: React.FC<DiceRollerProps> = ({
  diceValues,
  rollDice,
  diceRolled,
}) => {
  return (
    <div className="flex">
      {diceValues.map((value, index) => (
        <div
          key={index}
          className="flex flex-col shadow rounded p-2 bg-gray-100 items-center mr-4"
        >
          <span className="font-bold">Dado {index + 1}</span>
          <span>{value}</span>
        </div>
      ))}
      <button
        type="button"
        onClick={rollDice}
        disabled={diceRolled}
        className={`${
          diceRolled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-700"
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200`}
      >
        Tirar dados
      </button>
    </div>
  );
};

export default DiceRoller;
