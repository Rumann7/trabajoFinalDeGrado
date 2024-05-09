"use client";

import { useSession } from "next-auth/react";

const Welcome: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="text-center p-40">
      <h1 className="text-7xl font-bold mb-4 p-5">
        ¡BIENVENIDO {session ? `${session.user?.name}!` : "A DND ADMIN!"}{" "}
      </h1>
      {session ? (
        <>
          <p className="text-3xl p-3">
            Gracias por iniciar sesión, ahora podrás crear personajes y crear
            salas así como unirte a otras salas con tal de que puedas adentrarte
            en el mundo de Dragones y Mazmorras de la forma mas sencilla posible
            y menos tediosa posible. ¡DIVIERTETE!
          </p>
          <p>
            (NOTA: Esta página NO es un juego, su proposito es ayudarte a
            adentrarte en el mundo de dnd de forma sencilla, ya que a veces
            puede resultar muy tedioso)
          </p>
        </>
      ) : (
        <>
          <p className="text-3xl p-3">
            Estás a punto de embarcarte en una nueva gran aventura con tus 5
            compañeros de armas esperando a enfrentar posiblemente unas de las
            mayores calamidades jamás descubiertas y por descubrir por la
            humanidad en la que posiblemente acabes algunas veces perdiendo la
            esperanza.
          </p>
          <p>(Vas a iniciar sesión en esta página)</p>
        </>
      )}
    </div>
  );
};

export default Welcome;
