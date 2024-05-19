import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RoomProps {
  name: string;
  code: string;
  characters: number;
}

const NotUrRoom: React.FC<RoomProps> = ({ name, code, characters }) => {
  return (
    <Link
      href={`/dashboard/visitorRoom/${code}`}
      className="bg-gray-700 shadow-md text-white rounded p-3 m-1 hover:bg-gray-800 cursor-pointer relative"
    >
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <p>Personajes: {characters}</p>
    </Link>
  );
};

export default NotUrRoom;
