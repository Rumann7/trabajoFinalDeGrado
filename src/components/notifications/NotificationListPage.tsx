"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingWizard from "../loadingWizard";
import Image from "next/image";
import Notification from "./notification";

interface Notification {
  _id: string;
  inviter: string;
  salaId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export default function NotificationListPage() {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchNotifications() {
      if (!session?.user?.email) return;
      setLoading(true);
      try {
        const response = await fetch(
          `/api/users/getNotifications/${session.user.email}`
        );
        const data = await response.json();
        setNotifications(data.notifications || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [session]);

  if (loading) return <LoadingWizard />;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <Image
              src="/images/sadSkeleton.png"
              alt="Imagen Dungeon Master 1"
              height={300}
              width={300}
              className="border rounded mt-5" // Estilos de borde y esquinas redondeadas
            />
          </div>
          <div className="my-4 border-2 bg-black rounded p-3 font-papyrus text-white text-2xl">
            ¡AÚN NO TE HA INVITADO NADIE, AMIGO!
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex justify-between ml-24 text-white items-center mb-8 pt-28">
        <h1 className="text-2xl font-semibold">Tus notificaciones</h1>
      </div>
      <div className="grid my-5 gap-2 overflow-y-auto">
        {notifications.map((notification) => (
          <Notification key={notification._id} notification={notification} />
        ))}
      </div>
    </>
  );
}
