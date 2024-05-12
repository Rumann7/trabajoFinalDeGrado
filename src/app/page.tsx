"use client";

import React from "react";
import Welcome from "@/components/firstPage/welcome";
import About from "@/components/firstPage/about";
import Roles from "@/components/firstPage/roles";
import { useSession } from "next-auth/react";
import LoadingWizard from "@/components/loadingWizard";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="mt-20 text-center text-white">
      {status === "loading" ? (
        <LoadingWizard />
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
