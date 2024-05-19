import RoomListPage from "@/components/rooms/RoomsListPage";

export default function yourRooms() {
  return (
    <div className="mx-auto">
      <div className="container mx-auto sm:px-8 md:px-16 lg:px-20 xl:px-40 h-full">
        <RoomListPage />
      </div>
    </div>
  );
}
