import { connectDB } from "@/libs/mongodb";
import User from "@/models/usuario";
import Notification from "@/models/notification";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  try {
    connectDB();

    const user = await User.findOne({ email: params.email }).populate({
      path: "notificaciones",
      model: "Notification",
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { notifications: user.notificaciones },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving rooms: ", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving rooms." },
      { status: 500 }
    );
  }
}

export async function POST(request: any, { params }: any) {
  try {
    connectDB();

    const data = await request.json();
    const user = await User.findOne({ email: params.email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newRoom = new Notification(data);
    const savedRoom = await newRoom.save();

    user.notificaciones.push(savedRoom);
    await user.save();

    return NextResponse.json(
      { message: "Character added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding character:", error);
    return NextResponse.json(
      { message: "An error occurred while adding room." },
      { status: 500 }
    );
  }
}
