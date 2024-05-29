import React from 'react';

interface DiceResultsProps {
  results: { type: string; value: number }[];
}

const DiceRoll: React.FC<DiceResultsProps> = ({ results }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg mt-5">
      <h2 className="text-xl font-bold text-white mb-3">Resultados de Dados</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No se han lanzado dados aún.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="text-gray-200">
              <span className="font-bold">{result.type}:</span> {result.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiceRoll;
