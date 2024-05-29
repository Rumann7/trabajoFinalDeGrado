import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CharacterStats from './characterStats';
import FormInput from './formInput';

const statNames = [
  'Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma',
];

interface FormData {
  name: string;
  race: string;
  hpMax: number;
  currHp: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

const CharacterForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [diceRolled, setDiceRolled] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    race: '',
    hpMax: 0,
    currHp: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  const [statValues, setStatValues] = useState<{ [key: string]: number }>({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  const [diceValues, setDiceValues] = useState<number[]>(Array(6).fill(0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'hpMax' && { currHp: Number(value) }), // Asegura que currHp siempre es igual a hpMax
    }));
  };

  const rollDice = () => {
    const results = Array.from({ length: 6 }, () => Math.floor(Math.random() * 24) + 4);
    setDiceRolled(true);
    setDiceValues(results);
  };

  const handleStatChange = (stat: string, value: number) => {
    setStatValues((prev) => ({
      ...prev,
      [stat]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      strength: statValues.strength,
      dexterity: statValues.dexterity,
      constitution: statValues.constitution,
      intelligence: statValues.intelligence,
      wisdom: statValues.wisdom,
      charisma: statValues.charisma,
    };
    try {
      const response = await fetch(`/api/users/getCharacters/${session?.user?.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalFormData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      router.push('/dashboard/characterList');
    } catch (error) {
      console.error('Error adding character:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <FormInput
        name="race"
        value={formData.race}
        onChange={handleChange}
        placeholder="Raza"
        required
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
        statValues={statValues}
        setStatValues={handleStatChange}
        rollDice={rollDice}
        diceRolled={diceRolled}
        statNames={statNames}
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
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700'
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
