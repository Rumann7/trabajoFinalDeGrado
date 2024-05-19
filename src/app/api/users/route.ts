import { connectDB } from "@/libs/mongodb";
import User from "@/models/usuario";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectDB();
    const usuarios = await User.find();
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
