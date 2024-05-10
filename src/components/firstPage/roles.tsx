import Image from "next/image";

const Roles: React.FC = () => (
  <div className="text-center p-10 px-40 justify-between items-center bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 text-white">
    <h1 className="text-6xl mb-4 p-5">Elige tu rol</h1>
    <div className="flex w-full">
      <div className="flex-1 shadow-lg bg-gray-800 p-10 px-4 rounded mr-2 text-center">
        <h1 className="text-4xl mb-5">Dungeon Master</h1>
        <p className="text-left text-gray-300 mx-10">
          Te encargarás de gestionar las partidas y de mantener gestionar los
          miembros de tu party así como las fichas de los personajes de estos
          que han sido jubilados (o muertos) o los que están activos.
        </p>
        <div className="flex justify-center items-center">
          <Image
            src="/images/dm.jpg"
            alt="Imagen Dungeon Master 1"
            height={350}
            width={380}
            className="border rounded mt-5" // Estilos de borde y esquinas redondeadas
          />
        </div>
      </div>
      <div className="flex-1 shadow-lg bg-gray-800 py-10 px-4 rounded mr-2 text-center">
        <h1 className="text-4xl mb-5">Jugador</h1>
        <p className="text-left text-gray-300 mx-10">
          Tendrás que hacerte una ficha de personaje para poder seguir seguir
          adelante y así formar parte de una party, puedes elegir tanto clase
          como raza así como su nombre e historia. Por cierto, no solo podrás
          crearte un personaje, puedes crear más
        </p>
        <div className="flex justify-center items-center">
          <Image
            src="/images/players.jpeg"
            alt="Imagen Dungeon Master 1"
            height={400}
            width={400}
            className="border rounded mt-5" // Estilos de borde y esquinas redondeadas
          />
        </div>
      </div>
    </div>
  </div>
);

export default Roles;
