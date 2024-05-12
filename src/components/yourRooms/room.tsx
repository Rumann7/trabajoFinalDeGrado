import React from "react";

interface RoomProps {
  code: string;
  name: string;
  participants: number;
}

const Room: React.FC<RoomProps> = ({ code, name, participants }) => {
  return (
    <div className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <h3 className="text-lg mb-4">Código para unirse: {code}</h3>
      <p>Participantes: {participants}</p>
    </div>
  );
};

export default Room;
