import { useState } from "react";
import Die from "./die";

export default function GameCenter() {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const rollD20 = () => Math.floor(Math.random() * 20) + 1;
  const rollD10 = () => Math.floor(Math.random() * 10) + 1;
  const rollD100 = () => Math.floor(Math.random() * 100) + 1;
  const rollD6 = () => Math.floor(Math.random() * 6) + 1;
  const rollD4 = () => Math.floor(Math.random() * 4) + 1;
  const rollD8 = () => Math.floor(Math.random() * 8) + 1;
  const rollD12 = () => Math.floor(Math.random() * 12) + 1;

  return (
    <div className="w-full md:w-2/3 p-5 pt-28">
      <input
        type="file"
        className="block w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-gray-600 file:text-white
    hover:file:bg-gray-500 mb-5"
        onChange={handleFileChange}
      />
      <div className="w-full border h-96 bg-gray-700 overflow-hidden rounded-lg shadow-right flex items-center justify-center">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-gray-500">No image uploaded</div>
        )}
      </div>
      <div className="flex mt-10 space-x-4 justify-center">
        <Die type="d20" onRoll={rollD20} />
        <Die type="d10 (1-10)" onRoll={rollD10} />
        <Die type="d100" onRoll={rollD100} />
        <Die type="d6" onRoll={rollD6} />
        <Die type="d4" onRoll={rollD4} />
        <Die type="d8" onRoll={rollD8} />
        <Die type="d12" onRoll={rollD12} />
      </div>
    </div>
  );
}
