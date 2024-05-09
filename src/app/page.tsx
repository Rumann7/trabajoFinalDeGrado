"use client";

import React from "react";
import Welcome from "@/components/firstPage/welcome";
import About from "@/components/firstPage/about";
import Roles from "@/components/firstPage/roles";
import { useSession } from "next-auth/react";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="mt-20">
      {status === "loading" ? (
        <li className="px-3 py-1">Cargando...</li>
      ) : !session ? (
        <>
          <Welcome />
          <About />
          <Roles />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default Home;
