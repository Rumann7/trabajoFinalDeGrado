import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-blue-900 shadow-xl flex justify-between items-center p-2 px-4 lg:px-40 fixed w-full top-0 z-10">
      <Link
        href="/"
        className="flex text-white font-bold p-1 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-800 hover:scale-105"
      >
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
          className="h-6 w-6 fill-current text-blue-100"
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
          <>
            <li>
              <Image
                src="/images/walkingWizard.gif"
                alt="Loading..."
                height={50}
                width={50}
              />
            </li>
            <li className="text-white">Loading...</li>
          </>
        ) : session ? (
          <>
            <li className="px-3 py-1">
              <button
                onClick={() => router.push("/dashboard/yourRooms")}
                className="py-3 px-4 text-white transition font-bold rounded duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
              >
                Salas
              </button>
            </li>
            <li className="px-3 py-1">
              <button
                onClick={() => router.push("/dashboard/characterList")}
                className="py-3 px-4 text-white transition font-bold rounded duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
              >
                Personajes
              </button>
            </li>
            <li className="px-3 py-1">
              <button
                className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                onClick={() => setShowMenu(!showMenu)}
              >
                {session?.user?.name}
              </button>
              {showMenu && (
                <ul className="absolute p-2 top-full right-0 bg-gray-800 lg:mr-40 text-white shadow rounded mt-2 transition-transform transform origin-top">
                  <li className="py-2 px-4">{session?.user?.email}</li>
                  <li className="py-2 px-4">
                    <button
                      onClick={() => signOut()}
                      className="bg-red-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-red-700 hover:scale-105"
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
              <button
                onClick={() => router.push("/authForms/login")}
                className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
              >
                Log in
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/authForms/signup")}
                className="bg-blue-600 shadow text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
              >
                Sign up
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
