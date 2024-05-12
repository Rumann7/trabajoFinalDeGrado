import { connectDB } from "@/libs/mongodb";
import User from "@/models/usuario";
import { NextResponse } from "next/server";
import characterSheet from "@/models/characterSheet";

export async function GET(req: any, { params }: any) {
  try {
    connectDB();

    const user = await User.findOne({ email: params.email }).populate({
      path: "characterSheets",
      model: "CharacterSheet",
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { characters: user.characterSheets },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving characters: ", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving characters." },
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

    const newCharacterSheet = new characterSheet(data);
    const savedCharacterSheet = await newCharacterSheet.save();

    user.characterSheets.push(savedCharacterSheet);

    await user.save();

    return NextResponse.json(
      { message: "Character added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding character:", error);
    return NextResponse.json(
      { message: "An error occurred while adding character." },
      { status: 500 }
    );
  }
}
