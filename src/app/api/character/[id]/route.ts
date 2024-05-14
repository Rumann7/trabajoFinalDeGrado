import { NextResponse } from "next/server";
import CharacterSheet from "@/models/characterSheet";
import { connectDB } from "@/libs/mongodb";

export async function DELETE(request: any, { params }: any) {
  connectDB();

  try {
    const deletedCharacter = await CharacterSheet.findByIdAndDelete(params.id);

    if (!deletedCharacter) {
      return NextResponse.json(
        { message: "Character not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedCharacter);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export function PUT(request: any, { params }: any) {
  console.log(params);
  return NextResponse.json({
    message: `actualizando ${params.id}`,
  });
}
