const Roles: React.FC = () => (
  <div className="text-center p-10 px-40 justify-between items-center">
    <h1 className="text-6xl mb-4 p-5">Elije tu rol</h1>
    <div className="flex w-full">
      <div className="flex-1 shadow-lg bg-gray-300 p-10 px-4 rounded mr-2">
        <h1 className="text-4xl mb-5">Dungeon Master</h1>
        <p className="text-left mx-10">
          Te encargarás de gestionar las partidas y de mantener gestionar los
          miembros de tu party así como las fichas de los personajes de estos
          que han sido jubilados (o muertos) o los que están activos.
        </p>
        <img
          src="https://via.placeholder.com/150"
          alt="Imagen Dungeon Master 1"
          className="mx-auto mt-5"
        />
      </div>
      <div className="flex-1 shadow-lg bg-gray-300 py-10 px-4 rounded mr-2">
        <h1 className="text-4xl mb-5">Dungeon Master</h1>
        <p className="text-left mx-10">
          Eres un jugador, y tendrás que hacerte una ficha de personaje para
          poder seguir seguir adelante y así formar parte de una party, puedes
          elegir tanto clase como raza así como su nombre, historia y apariencia
          física.
        </p>
        <img src="../../public/dm.svg" className="mx-auto mt-5" />
      </div>
    </div>
  </div>
);

export default Roles;
