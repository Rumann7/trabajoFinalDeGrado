"use client";

import CharacterListPage from "@/components/characterSheets/characterListPage";

function DashboardPage() {
  return (
    <div className="bg-white shadow-lg p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Your characters
      </h1>
      <CharacterListPage />
    </div>
  );
}

export default DashboardPage;
