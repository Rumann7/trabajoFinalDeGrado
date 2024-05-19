import React from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
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
  onClose: () => void; // Esta función se pasará desde el componente padre
}

const Modal: React.FC<ModalProps> = ({
  name,
  race,
  hpMax,
  currHp,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  bonusStrength,
  bonusDexterity,
  bonusConstitution,
  bonusIntelligence,
  bonusWisdom,
  bonusCharisma,
  onClose,
}) => {
  const router = useRouter();

  return (
    <div className="fixed text-white inset-0 flex items-center justify-center z-70">
      <div
        className="absolute inset-0 bg-gray-900 opacity-70"
        onClick={onClose}
      ></div>
      <div className="bg-gray-800 rounded-md z-50 p-6 w-96">
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <h3 className="text-lg mb-4">{race}</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <p className="text-lg font-bold">{strength}</p>
            <p className="text-sm ml-2">
              {bonusStrength >= 0 ? `+${bonusStrength}` : bonusStrength}
            </p>
            <p className="text-xs ml-2">Fuerza</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold">{dexterity}</p>
            <p className="text-sm ml-2">
              {bonusDexterity >= 0 ? `+${bonusDexterity}` : bonusDexterity}
            </p>
            <p className="text-xs ml-2">Destreza</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold">{constitution}</p>
            <p className="text-sm ml-2">
              {bonusConstitution >= 0
                ? `+${bonusConstitution}`
                : bonusConstitution}
            </p>
            <p className="text-xs ml-2">Constitución</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold">{intelligence}</p>
            <p className="text-sm ml-2">
              {bonusIntelligence >= 0
                ? `+${bonusIntelligence}`
                : bonusIntelligence}
            </p>
            <p className="text-xs ml-2">Inteligencia</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold">{wisdom}</p>
            <p className="text-sm ml-2">
              {bonusWisdom >= 0 ? `+${bonusWisdom}` : bonusWisdom}
            </p>
            <p className="text-xs ml-2">Sabiduría</p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-bold">{charisma}</p>
            <p className="text-sm ml-2">
              {bonusCharisma >= 0 ? `+${bonusCharisma}` : bonusCharisma}
            </p>
            <p className="text-xs ml-2">Carisma</p>
          </div>
          <div className="flex items-center col-span-2">
            <p>
              <span className="text-lg font-bold">{currHp}/</span>
              {hpMax}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 mx-2 text-white transition font-bold rounded duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
