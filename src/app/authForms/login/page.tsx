"use client";

import Loading from "@/components/loadingWizard";
import LoginButton from "@/components/logInPage/loginButton";
import LoginInput from "@/components/logInPage/loginInput";
import WhaddyaDoingHere from "@/components/whaddyaDoingHere";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState, useEffect } from "react";

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

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

  if (status === "loading") {
    return <Loading />;
  }

  if (session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
        <p className="text-white">You are already logged in. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="p-10 bg-gray-800 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 rounded-lg shadow text-white p-2 mb-2">
              d20 login, sacaste un 1, {error}
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
    </div>
  );
};

export default Login;
