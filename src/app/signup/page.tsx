"use client";

import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import LoginInputPattern from "@/components/logInPage/loginInputPattern";
import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    // Verifica que todos los campos estén llenos y que las contraseñas coincidan
    if (
      username &&
      email &&
      password &&
      name &&
      lastName &&
      password === confirmPassword
    ) {
      // Aquí podrías incluir la lógica para registrar al usuario, como una petición a tu API
      console.log("Registrando usuario...");
    } else {
      // Muestra un mensaje de error adecuado
      console.error("Por favor, rellene todos los campos correctamente.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <h2 className="text-gray-700 text-xl font-bold mb-5">REGISTRO</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <LoginInput
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-1/2 ml-2">
              <LoginInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Apellidos"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <LoginInputPattern
              type="text"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <LoginInput
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <LoginInput
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <LoginInput
              type="password"
              id="confirm password"
              name="confirm password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Register;
