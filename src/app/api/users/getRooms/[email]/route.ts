import { connectDB } from "@/libs/mongodb";
import User from "@/models/usuario";
import { NextResponse } from "next/server";
import Sala from "@/models/sala";

export async function GET(req: any, { params }: any) {
  try {
    connectDB();

    const user = await User.findOne({ email: params.email }).populate({
      path: "salas",
      model: "Sala",
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ salas: user.salas }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving rooms: ", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving rooms." },
      { status: 500 }
    );
  }
}

export async function POST(request: any, { params, body }: any) {
  try {
    connectDB();

    const data = await request.json();
    const user = await User.findOne({ email: params.email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.salas) {
      user.salas = []; // Initialize if undefined
    }
    const newRoom = new Sala(data);
    const savedRoom = await newRoom.save();

    user.salas.push(savedRoom);
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
