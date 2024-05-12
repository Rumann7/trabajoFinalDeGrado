import RoomListPage from "@/components/yourRooms/RoomsListPage";
import Link from "next/link";

export default function yourRooms() {
  return (
    <div className="mx-auto bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <div className="container mx-auto sm:px-8 md:px-16 lg:px-20 xl:px-40 h-full">
        <RoomListPage />
      </div>
    </div>
  );
}
