"use client";

import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import axios from "axios";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null); // Nuevo estado para manejar errores
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

    if (res?.ok) return router.push("/dashboard/characterList");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white p-2 mb-2">
              Tiraste un d20 para intentar iniciar sesión, pero sacaste un 1,{" "}
              {error}
            </div>
          )}
          <label
            htmlFor="username"
            className="block text-gray-700 text-xl font-bold mb-5"
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
    </div>
  );
};

export default Login;
