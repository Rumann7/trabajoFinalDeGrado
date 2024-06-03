import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

interface User {
  username: string;
  name: string;
  surname: string;
  email: string;
}

interface UsersToInviteProps {
  roomId: string;
}

const UsersToInvite: React.FC<UsersToInviteProps> = ({ roomId }) => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmSendEmail, setConfirmSendEmail] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Error fetching users");

      const data = await response.json();
      const filteredData = data.filter(
        (user: User) => user.email !== session?.user?.email
      );
      setUsers(filteredData);
      setFilteredUsers(filteredData);
    } catch (error) {
      setError(`Error fetching users: ${error}`);
    }
  };

  useEffect(() => {
    if (showDropdown && status === "authenticated") {
      fetchUsers();
    }
  }, [showDropdown, status]);

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

  const handleCloseModal = () => {
    setConfirmSendEmail(false);
    setSelectedUser(null);
  };

  const handleSendNotification = async () => {
    if (selectedUser && session?.user?.name) {
      try {
        const response = await fetch(
          `/api/users/getNotifications/${selectedUser.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inviter: session.user.name,
              salaId: roomId,
              message: "Estas invitado a unirte a nuestra sala",
            }),
          }
        );

        if (!response.ok) throw new Error("Error sending notification");

        handleCloseModal();
      } catch (error) {
        setError(`Error sending notification: ${error}`);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
          console.log(roomId);
        }}
        className="px-4 py-2 bg-blue-600 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500"
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
            className="absolute right-0 bottom-12 w-68 max-h-64 bg-gray-900 border-b border-blue-700 shadow-lg z-60 overflow-y-auto"
          >
            <div className="sticky top-0 bg-gray-900 p-2 border-b border-blue-700">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg focus:outline-none"
              />
            </div>
            <ul className="py-1">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li
                    key={user.email}
                    onClick={() => setSelectedUser(user)}
                    className="px-4 py-2 text-sm m-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                  >
                    <div className="font-bold">{user.username}</div>
                    <div>
                      {user.name} {user.surname}
                    </div>
                    <div>{user.email}</div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm m-2 bg-gray-700 rounded-lg text-center text-white">
                  No se encontraron resultados.
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-4">
                ¿Estás seguro de que quieres enviarle una invitación a{" "}
                <strong>
                  {selectedUser.name} {selectedUser.surname}
                </strong>
                ?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 mr-2 bg-red-600 text-white rounded-full"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    handleSendNotification();
                    handleCloseModal();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-full"
                >
                  Sí
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersToInvite;
