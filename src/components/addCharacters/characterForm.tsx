import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import FormInput from './formInput';

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
  bonusStrength: number;
  bonusDexterity: number;
  bonusConstitution: number;
  bonusIntelligence: number;
  bonusWisdom: number;
  bonusCharisma: number;
}

const CharacterForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [diceRolled, setDiceRolled] = useState(false);
  const [rolls, setRolls] = useState<{ id: number; value: number }[]>([]);
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
    bonusStrength: 0,
    bonusDexterity: 0,
    bonusConstitution: 0,
    bonusIntelligence: 0,
    bonusWisdom: 0,
    bonusCharisma: 0,
  });

  const [assignedRolls, setAssignedRolls] = useState<{ [key: string]: number }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'hpMax' ? Number(value) : value,
      ...(name === 'hpMax' && { currHp: Number(value) }), // Asegura que currHp siempre es igual a hpMax
    }));
  };

  const calculateBonus = (value: number) => {
    return Math.floor((value - 10) / 2);
  };

  const rollDice = () => {
    const newRolls = Array.from({ length: 6 }, (_, index) => ({
      id: index,
      value: Math.floor(Math.random() * 21) + 4,
    }));
    setRolls(newRolls);
    setDiceRolled(true);
  };

  const handleRollAssign = (e: React.ChangeEvent<HTMLSelectElement>, rollId: number) => {
    const value = e.target.value;
    const attr = value !== "" ? value : null;
    const currentAttr = Object.keys(assignedRolls).find(
      key => assignedRolls[key] === rollId
    );

    setAssignedRolls(prev => {
      const newAssignedRolls = { ...prev };
      if (currentAttr) delete newAssignedRolls[currentAttr];
      if (attr !== null) newAssignedRolls[attr] = rollId;
      return newAssignedRolls;
    });

    setFormData((prev: any) => {
      const newFormData = { ...prev };
      if (currentAttr) {
        newFormData[currentAttr as keyof FormData] = 0;
        newFormData[`bonus${currentAttr.charAt(0).toUpperCase() + currentAttr.slice(1)}` as keyof FormData] = calculateBonus(0);
      }
      if (attr !== null) {
        const rollValue = rolls.find(roll => roll.id === rollId)?.value;
        if (rollValue !== undefined) {
          newFormData[attr as keyof FormData] = rollValue;
          newFormData[`bonus${attr.charAt(0).toUpperCase() + attr.slice(1)}` as keyof FormData] = calculateBonus(rollValue);
        }
      }
      return newFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/getCharacters/${session?.user?.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
    <div className="flex space-x-8">
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
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
      
      {diceRolled && (
        <div className="self-start grid grid-cols-2 gap-4 rounded-lg shadow-2xl p-4 bg-gray-700 flex-1">
          {rolls.map((roll) => (
            <div key={roll.id} className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded">
              <span className="text-white">Roll {roll.id + 1}: {roll.value}</span>
              <select
                value={Object.keys(assignedRolls).find(key => assignedRolls[key] === roll.id) || ""}
                onChange={(e) => handleRollAssign(e, roll.id)}
                className="appearance-none border rounded text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:bg-gray-600 shadow-inner"
              >
                <option value="">Asignar a...</option>
                {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((attr) => (
                  <option key={attr} value={attr}>
                    {attr.charAt(0).toUpperCase() + attr.slice(1)} {assignedRolls[attr] !== undefined && '(Asignado)'}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterForm;
