import React from "react";

interface RoomProps {
  name: string;
  characters: number;
}

const NotUrRoom: React.FC<RoomProps> = ({ name, characters }) => {
  return (
    <div className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer relative">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <p>Personajes: {characters}</p>
    </div>
  );
};

export default NotUrRoom;
