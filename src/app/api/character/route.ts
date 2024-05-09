import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import characterSheet from "@/models/characterSheet";

export async function GET() {
  try {
    await connectDB();
    const characterSheets = await characterSheet.find();
    return NextResponse.json(characterSheets);
  } catch (error) {
    return NextResponse.json(Error);
  }
}

export async function POST(request: any) {
  try {
    const data = await request.json();
    const newCharacterSheet = new characterSheet(data);
    const savedCharacterSheet = await newCharacterSheet.save();
    return NextResponse.json(savedCharacterSheet);
  } catch (error) {
    return NextResponse.json(Error);
  }
}
