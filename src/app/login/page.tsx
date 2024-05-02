import { getError, login } from "@/components/context/lib";
import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import MensajeError from "@/components/logInPage/mensajeError";
import { redirect } from "next/navigation";
import React from "react";

const Login: React.FC = async () => {
  const  message = await getError();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <label
          htmlFor="username"
          className="block text-gray-700 text-xl font-bold mb-5"
        >
          LOGIN
        </label>
        <form 
          data-testid="login-form"
          action={async (formData) => {
            "use server";
            await login(formData);
            redirect("/home");
          }}
        >
          <div className="mb-4">
            <LoginInput
              type="text"
              id="username"
              name="username"
              placeholder="username"
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
          <MensajeError message={message}/>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
