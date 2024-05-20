"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import BarButton from "@/components/sideBarRooms/buttons";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`bg-gray-800 text-white shadow-right transform transition-width duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden lg:w-64 lg:block`}
      >
        <div className="p-6 mt-24">
          <ul className="mt-4">
            <BarButton
              url="/dashboard/yourRooms"
              content="Initial Page"
              isActive={pathname === "/dashboard/yourRooms"}
            />
            <BarButton
              url="/dashboard/yourRooms/myRooms"
              content="Tus salas"
              isActive={pathname === "/dashboard/yourRooms/myRooms"}
            />
            <BarButton
              url="/dashboard/yourRooms/allRooms"
              content="Todas las salas"
              isActive={pathname === "/dashboard/yourRooms/allRooms"}
            />
          </ul>
        </div>
        {isOpen && (
          <button
            className="absolute bottom-0 left-0 w-full bg-gray-700 text-white py-3 px-4 rounded-b duration-300 ease-in-out transform hover:bg-gray-600 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            Cerrar
          </button>
        )}
      </aside>
      {isOpen ? null : (
        <button
          className="fixed bottom-4 left-4 bg-gray-900 text-white p-2 rounded-lg shadow-lg z-10 lg:hidden"
          onClick={toggleSidebar}
        >
          Abrir
        </button>
      )}

      <div className="flex-grow flex flex-col">
        <header className="bg-gray-900 p-4">
          {!isOpen && (
            <button
              className="lg:hidden block text-white mr-4"
              onClick={toggleSidebar}
            >
              Menu
            </button>
          )}
        </header>
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
}
