import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-gray-300 shadow-xl flex justify-between items-center p-2 px-4 lg:px-40 fixed w-full top-0 z-10">
      <Link href="/" className="flex rounded shadow hover:bg-gray-400 p-1">
        <div>
          <Image src="/images/logo.png" alt="Logo" width="50" height="60" />
        </div>
        <Image src="/images/text.png" alt="Texto" width="300" height="50" />
      </Link>
      <button
        className="block lg:hidden focus:outline-none"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          className="h-6 w-6 fill-current text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul
        className={`flex-col lg:flex lg:flex-row lg:gap-x-2 ${
          showMenu ? "block" : "hidden"
        } lg:block`}
      >
        {status === "loading" ? (
          <li className="px-3 py-1">Cargando...</li>
        ) : session ? (
          <>
            <li className="px-3 py-1">
              <a href="/dashboard/yourRooms">Salas</a>
            </li>
            <li className="px-3 py-1">
              <a href="/dashboard/characterList">Personajes</a>
            </li>
            <li className="px-3 py-1">
              <button
                className="bg-gray-500 shadow text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:bg-gray-600"
                onClick={() => setShowMenu(!showMenu)}
              >
                {session?.user?.name}
              </button>
              {showMenu && (
                <ul className="absolute top-full right-0 bg-white shadow rounded mt-2">
                  <li className="py-2 px-4">{session?.user?.email}</li>
                  <li className="py-2 px-4">
                    <button
                      onClick={() => signOut()}
                      className="text-red-500 hover:text-red-700"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <a
                href="/login"
                className="bg-gray-500 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-gray-600"
              >
                Log in
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="bg-gray-500 shadow text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:bg-gray-600"
              >
                Sign in
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
