import { useState } from "react";
import Die from "./die";

export default function DiceRoller() {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const rollDice = (type: string) => {
    let result: number;
    switch (type) {
      case "d20":
        result = Math.floor(Math.random() * 20) + 1;
        break;
      case "d10 (1-10)":
        result = Math.floor(Math.random() * 10) + 1;
        break;
      case "d10 (00-90)":
        result = (Math.floor(Math.random() * 10) + 1) * 10;
        break;
      case "d6":
        result = Math.floor(Math.random() * 6) + 1;
        break;
      case "d4":
        result = Math.floor(Math.random() * 4) + 1;
        break;
      case "d8":
        result = Math.floor(Math.random() * 8) + 1;
        break;
      case "d12":
        result = Math.floor(Math.random() * 12) + 1;
        break;
      default:
        result = 0;
        break;
    }
    alert(`Número aleatorio obtenido: ${result}`);
  };

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
      <div className="w-full border h-96 bg-gray-700 overflow-hidden rounded-lg shadow-right">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600"></div>
        )}
      </div>
      <div className="flex mt-10">
        <Die onClick={() => rollDice("d20")} type="d20" value={""} />
        <Die
          onClick={() => rollDice("d10 (1-10)")}
          type="d10 (1-10)"
          value={""}
        />
        <Die
          onClick={() => rollDice("d10 (00-90)")}
          type="d10 (00-90)"
          value={""}
        />
        <Die onClick={() => rollDice("d6")} type="d6" value={""} />
        <Die onClick={() => rollDice("d4")} type="d4" value={""} />
        <Die onClick={() => rollDice("d8")} type="d8" value={""} />
        <Die onClick={() => rollDice("d12")} type="d12" value={""} />
      </div>
    </div>
  );
}
