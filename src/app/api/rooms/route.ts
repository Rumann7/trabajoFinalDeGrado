import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Sala from "@/models/sala";

export async function GET() {
  try {
    await connectDB();
    const rooms = await Sala.find();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(Error);
  }
}

export async function POST(request: any) {
  try {
    const data = await request.json();
    const newRoom = new Sala(data);
    const savedRoom = await newRoom.save();
    return NextResponse.json(savedRoom);
  } catch (error) {
    return NextResponse.json(Error);
  }
}
