"use client";

import React from "react";
import AllTheRooms from "@/components/rooms/allTheRooms";

export default function AllRooms() {
  return (
    <div className="mx-auto">
      <div className="container mx-auto sm:px-8 md:px-16 lg:px-20 xl:px-40 h-full">
        <AllTheRooms />
      </div>
    </div>
  );
}
