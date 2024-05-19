interface DieProps {
  value: string;
  onClick: () => void;
  type: string;
}

const Die: React.FC<DieProps> = ({ value, onClick, type }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-semibold mb-1">{type}</h1>
      <div
        className="rounded-full border mx-5 bg-gray-400 h-12 w-12 flex justify-center items-center text-gray-700 text-xl font-bold cursor-pointer transform transition duration-300 hover:shadow-lg hover:border-gray-600 hover:text-gray-900"
        onClick={onClick}
      ></div>
    </div>
  );
};

export default Die;
