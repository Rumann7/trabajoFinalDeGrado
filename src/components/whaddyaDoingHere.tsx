import Image from "next/image";

interface whaddyaDoingHereProps {
  image: string;
  pUno: string;
  pDos: string;
  pTres: string;
}

const WhaddyaDoingHere: React.FC<whaddyaDoingHereProps> = ({
  image,
  pUno,
  pDos,
  pTres,
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center">
          <Image
            src={image}
            alt="Imagen Dungeon Master 1"
            height={300}
            width={300}
            className="border-2 rounded mt-5" // Estilos de borde y esquinas redondeadas
          />
        </div>
        <div className="my-4 text-align-center border-2 bg-black p-3 font-papyrus text-white text-2xl">
          <p>{pUno}</p>
          <p>{pDos}</p>
          <p>{pTres}</p>
        </div>
      </div>
    </div>
  );
};

export default WhaddyaDoingHere;
