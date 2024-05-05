"use client";

import { useSession, signOut } from "next-auth/react";

function DasboardPage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div>
      <div>
        DashboardPage
        <button
          onClick={() => {
            signOut();
          }}
          className="w-full bg-blue-700 text-white py-2 rounded font-bold hover:bg-blue-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DasboardPage;
