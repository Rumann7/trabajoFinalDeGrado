"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
}

export default function UsersToInvite() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Error fetching users");

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError(`Error fetching users: ${error}`);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      fetchUsers();
    }
  }, [showDropdown]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 bg-blue-600 text-white rounded-full"
      >
        Invitar a alguien
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-12 w-68 max-h-64 bg-gray-900 rounded-md shadow-lg z-60 overflow-y-auto"
          >
            <div className="sticky top-0 bg-gray-900 p-2">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              />
            </div>
            <ul className="py-1">
              {filteredUsers.map((user) => (
                <li
                  key={user.email}
                  className="px-4 py-2 text-sm m-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <div className="font-bold">{user.username}</div>
                  <div>
                    {user.name} {user.surname}
                  </div>
                  <div>{user.email}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
