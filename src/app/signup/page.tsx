"use client";

import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { FaUser } from "react-icons/fa";

const Register: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);  // Nuevo estado para manejar errores

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const profileImageString = profileImage || ""; // Si profileImage es null, asigna una cadena vacía

    try {
      const res = await axios.post('/api/auth/signup', {
        username: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("lastName"),
        profilePic: profileImageString,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      setError("Tiraste un d20 para registrarte, sacaste un 1."); // Establece el mensaje de error
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const dataURL = e.target.result as string;
          setProfileImage(dataURL);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}  {/* Muestra el mensaje de error */}
          <h2 className="text-gray-700 text-xl font-bold mb-5">REGISTRO</h2>
          <div className="mb-4 flex justify-center">
            <label htmlFor="profileImage" className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUser className="text-gray-500 w-10 h-10" />
              )}
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <LoginInput
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-4">
            <LoginInput
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Apellidos"
            />
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
