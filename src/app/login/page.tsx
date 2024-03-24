"use client";

import LoginButton from "../../components/logInPage/loginButton";
import LoginInput from "../../components/logInPage/loginInput";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    if (username && password) {
      // Si ambos campos están llenos, realiza la navegación
      document.location.href = "/home";
    } else {
      // Muestra un error en la consola si hay campos vacíos
      console.error("Por favor, rellene todos los campos.");
    }
  };

  const isFormValid = username && password;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <label
          htmlFor="username"
          className="block text-gray-700 text-xl font-bold mb-5"
        >
          LOGIN
        </label>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <LoginInput
              type="text"
              id="username"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <LoginInput
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
