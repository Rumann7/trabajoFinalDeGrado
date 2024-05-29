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
    <div className="text-white">
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
