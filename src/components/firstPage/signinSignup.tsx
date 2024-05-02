import React from "react";

const LoginSignup: React.FC = () => {
  return (
    <div className="px-40 bg-gray-200 p-20">
      <h1 className="text-4xl mb-5">¡EMPIEZA AHORA MISMO!</h1>
      <div className="py-4">
        <a
          href="/signup"
          className="text-4xl bg-gray-500 text-white font-bold py-4 px-8 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-gray-600"
        >
          Regístrate ahora
        </a>
      </div>
      <div>
        <div>
          {" "}
          <div className="m-6">¿Tienes ya una cuenta?</div>{" "}
        </div>
        <a
          href="/login"
          className="text-4xl bg-gray-500 text-white font-bold py-4 px-8 mt-10 rounded transition duration-300 ease-in-out transform hover:bg-gray-600"
        >
          Iniciar sesión
        </a>
      </div>
    </div>
  );
};

export default LoginSignup;
