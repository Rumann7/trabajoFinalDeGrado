import CharacterListPage from "@/components/characterSheets/characterListPage";
import Link from "next/link";

export default function yourRooms() {
  return (
    <div className="h-screen bg-gradient-to-b">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-40 h-full">
        <div className="flex justify-between text-white items-center mb-8 pt-28">
          <h1 className="text-2xl font-semibold">Tus personajes</h1>
          <Link
            href="#"
            className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            Crear Sala
          </Link>
        </div>
        <div>work in progress...</div>
      </div>
    </div>
  );
}
