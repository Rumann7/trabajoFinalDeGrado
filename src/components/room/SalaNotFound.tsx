import Image from "next/image";

export default function SalaNotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/images/skeleton.png"
            alt="Imagen Dungeon Master 1"
            height={300}
            width={300}
            className="border rounded mt-5" // Estilos de borde y esquinas redondeadas
          />
        </div>
        <div className="my-4 border-2 bg-black rounded p-3 font-papyrus text-white text-2xl">
          ¡LO SIENTO, ESTA SALA NO EXISTIE!
        </div>
      </div>
    </div>
  );
}
