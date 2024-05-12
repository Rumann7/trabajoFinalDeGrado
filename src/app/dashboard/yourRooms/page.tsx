import Image from "next/image";

export default function yourRooms() {
  return (
    <div className="flex items-center justify-center mt-36 ml-14">
      <div className="max-w-4xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Menú de salas</h1>
            <p className="text-xl mb-4">
              Aquí podrás tener acceso a crear salas donde se generará un código
              para poder hacer que otros usuarios puedan unirse para ser
              jugadores. Tu también podrás unirte a salas que hayan creado otros
              usuarios, donde podrás ser un jugador con tus compañeros.
            </p>
            <p className="mt-4">
              ¡Adéntrate en el mundo de DND sin necesidad de pasar por procesos
              tediosos!
            </p>
          </div>
          <div>
            <Image
              src="/images/dndRoom.jpg" // Sustituye con el path real de tu imagen
              alt="Imagen descriptiva"
              width={250}
              height={100}
              objectFit="cover"
              className="border-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
