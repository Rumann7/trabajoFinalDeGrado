"use client";

import Loading from "@/components/loadingWizard";
import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import WhaddyaDoingHere from "@/components/whaddyaDoingHere";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) return router.push("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      {status === "loading" ? (
        <Loading />
      ) : !session ? (
        <div className="p-10 bg-gray-800 rounded shadow-lg">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 text-white p-2 mb-2">
                Tiraste un d20 para intentar iniciar sesión, pero sacaste un 1,{" "}
                {error}
              </div>
            )}
            <label
              htmlFor="username"
              className="block text-gray-300 text-xl font-bold mb-5"
            >
              LOGIN
            </label>
            <div className="mb-4">
              <LoginInput
                type="text"
                id="email"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="mb-6">
              <LoginInput
                type="password"
                id="password"
                name="password"
                placeholder="password"
              />
            </div>
            <LoginButton />
          </form>
        </div>
      ) : (
        <WhaddyaDoingHere
          image="/images/skeletonWaiting.png"
          pUno="¿QUÉ ESTÁS HACIENDO AQUÍ?"
          pDos="YA HAS INICIADO SESIÓN,"
          pTres="NO TIENES POR QUÉ ESTAR AQUÍ"
        />
      )}
    </div>
  );
};

export default Login;
