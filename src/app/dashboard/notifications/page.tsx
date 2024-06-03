import NotificationListPage from "@/components/notifications/NotificationListPage";

export default function NotificationList() {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-40 h-full">
        <NotificationListPage />
      </div>
    </div>
  );
}
