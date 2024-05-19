"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BarButton from "@/components/sideBarRooms/buttons";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`bg-gray-800 text-white shadow-right transform transition-width duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden lg:block`}
      >
        <div className="p-6 mt-24">
          <ul className="mt-4">
            <BarButton url="/dashboard/yourRooms" content="Initial Page" />
            <BarButton url="/dashboard/yourRooms/myRooms" content="Tus salas" />
            <BarButton
              url="/dashboard/yourRooms/allRooms"
              content="Todas las salas"
            />
          </ul>
        </div>
        {/* Botón de cierre de la barra lateral */}
        {isOpen && (
          <button
            className="absolute bottom-0 left-0 w-full bg-gray-700 text-white py-3 px-4 rounded-b duration-300 ease-in-out transform hover:bg-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Cerrar
          </button>
        )}
      </aside>
      {isOpen ? null : (
        <button
          className="fixed bottom-4 left-4 bg-gray-900 text-white p-2 rounded-lg shadow-lg z-10"
          onClick={toggleSidebar}
        >
          Abrir
        </button>
      )}

      <div className="flex-grow">
        <header className="bg-gray-900 p-4">
          {/* Botón para abrir la barra lateral */}
          {!isOpen && (
            <button
              className="lg:hidden block text-white mr-4"
              onClick={toggleSidebar}
            >
              Menu
            </button>
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
