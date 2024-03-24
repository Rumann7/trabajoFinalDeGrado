import React from "react";
import Header from "@/components/firstPage/header";
import Welcome from "@/components/firstPage/welcome";
import About from "@/components/firstPage/about";
import Roles from "@/components/firstPage/roles";
import LoginSignup from "@/components/firstPage/signinSignup";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Welcome />
        <About />
        <Roles />
        <LoginSignup />
      </div>
    </>
  );
};

export default Home;
