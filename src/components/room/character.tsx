interface chProps {
  name: string;
  race: string;
  currHp: number;
  hpMax: number;
}

const Character: React.FC<chProps> = ({ name, race, currHp, hpMax }) => {
  return (
    <div className="bg-gray-700 mx-2 shadow-xl widget p-4 widget my-3 rounded-lg shadow-right">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <p>{race}</p>
      <p>
        HP: <span className="font-bold text-xl">{currHp}</span>/{hpMax}
      </p>
    </div>
  );
};

export default Character;
