import CharacterListPage from "@/components/characterSheets/characterListPage";
import Link from "next/link";

export default function yourRooms() {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-40">
      <div className="flex justify-between items-center mb-8 mt-28">
        <h1 className="text-2xl font-semibold">Your Rooms</h1>
        <Link
          href="/add-character"
          className="bg-gray-500 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105"
        >
          Añadir sala
        </Link>
      </div>
      <h1>work in progress.</h1>
    </div>
  );
}
