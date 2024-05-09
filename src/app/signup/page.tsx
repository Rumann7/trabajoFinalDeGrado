"use client";

import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null); // Nuevo estado para manejar errores
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const signupRes = await axios.post("/api/auth/signup", {
        username: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("lastName"),
      });

      const loginRes = await signIn("credentials", {
        email: signupRes.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (loginRes?.ok) return router.push("/dashboard/characterList");
    } catch (error) {
      console.error(error);
      setError("Tiraste un d20 para registrarte, sacaste un 1."); // Establece el mensaje de error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover">
      <div className="p-10 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
          )}
          <h2 className="text-gray-700 text-xl font-bold mb-5">REGISTRO</h2>
          <div className="mb-4 flex">
            <div className="w-1/2 pr-2">
              <LoginInput
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
              />
            </div>
            <div className="w-1/2 pl-2">
              <LoginInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellidos"
              />
            </div>
          </div>
          <div className="mb-4">
            <LoginInput
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <LoginInput
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <LoginInput
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
            />
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Register;
