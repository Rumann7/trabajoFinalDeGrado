import { useState } from "react";
import CharacterStats from "./characterStats";
import FormInput from "./formInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CharacterForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [diceRolled, setDiceRolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    race: "",
    hpMax: 0,
    currHp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    bonusStrength: 0,
    bonusDexterity: 0,
    bonusConstitution: 0,
    bonusIntelligence: 0,
    bonusWisdom: 0,
    bonusCharisma: 0,
  });
  const [diceValues, setDiceValues] = useState<number[]>(
    Array.from({ length: 6 }, () => 0)
  );

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "hpMax" && { currHp: value }), // Asegura que currHp siempre es igual a hpMax
    }));
  };

  const rollDice = () => {
    const results = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 24) + 4
    );
    setDiceRolled(true);
    setFormData((prev) => ({
      ...prev,
      strength: results[0],
      dexterity: results[1],
      constitution: results[2],
      intelligence: results[3],
      wisdom: results[4],
      charisma: results[5],
      bonusStrength: Math.floor((results[0] - 10) / 2),
      bonusDexterity: Math.floor((results[1] - 10) / 2),
      bonusConstitution: Math.floor((results[2] - 10) / 2),
      bonusIntelligence: Math.floor((results[3] - 10) / 2),
      bonusWisdom: Math.floor((results[4] - 10) / 2),
      bonusCharisma: Math.floor((results[5] - 10) / 2),
    }));
    setDiceValues(results);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/users/getCharacters/${session?.user?.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      router.push("/dashboard/characterList");
    } catch (error) {
      console.error("Error adding character:", error);
    }
  };

  const handleCancel = () => {
    router.back(); // Devuelve a la página anterior
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
        type={""}
      />
      <FormInput
        name="race"
        value={formData.race}
        onChange={handleChange}
        placeholder="Raza"
        required
        type={""}
      />
      <FormInput
        name="hpMax"
        type="number"
        value={formData.hpMax}
        onChange={handleChange}
        label="HP:"
        required
      />
      <CharacterStats
        diceValues={diceValues}
        rollDice={rollDice}
        diceRolled={diceRolled}
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Añadir personaje
        </button>
        <button
          type="button"
          onClick={rollDice}
          disabled={diceRolled}
          className={`${
            diceRolled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700"
          } text-white font-bold mr-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200`}
        >
          Tirar dados
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CharacterForm;
