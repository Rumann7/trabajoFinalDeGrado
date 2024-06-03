import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationProps {
  notification: {
    _id: string;
    inviter: string;
    salaId: string;
    message: string;
    read: boolean;
    createdAt: Date;
  };
}

export default function Notification({ notification }: NotificationProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const markAsRead = async () => {
    try {
      const response = await fetch(`/api/notifications/${notification._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) {
        throw new Error("Error marcando la notificación como leída");
      }

      console.log("Notificación marcada como leída");
      location.reload(); // Recargar la página después de marcar como leída
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteNotification = async () => {
    try {
      const response = await fetch(`/api/notifications/${notification._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error borrando la notificación");
      }

      console.log("Notificación borrada");
      location.reload(); // Recargar la página después de borrar
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`relative mx-24 p-4 ${
        !notification.read ? "bg-blue-800" : "bg-gray-700"
      } shadow-xl rounded-xl`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">{notification.inviter}</p>
          <p className="text-gray-300">{notification.message}</p>
          <p className="text-sm text-gray-400">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              router.push(`/dashboard/visitorRoom/${notification.salaId}`);
            }}
            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Aceptar
          </button>
          {!notification.read && (
            <button
              onClick={markAsRead}
              className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Marcar como leída
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Rechazar
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg">
            <p className="mb-4">
              ¿Estás seguro de que quieres rechazar esta oferta?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  deleteNotification();
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
