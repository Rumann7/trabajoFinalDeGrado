import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

export async function DELETE(request: any, { params }: any) {
  await connectDB(); // Asegúrate de esperar a que la conexión a la base de datos se complete

  try {
    const deletedCharacter = await mongoose.model('CharacterSheet').findByIdAndDelete(params.id);

    if (!deletedCharacter) {
      return NextResponse.json(
        { message: "Character not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedCharacter);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, {
      status: 400,
    });
  }
}

export async function PUT(request: any, { params }: any) {
  await connectDB();

  try {
    const { currHp } = await request.json(); // Parse the JSON body to get the new currHp value

    if (currHp === undefined) {
      return NextResponse.json(
        { message: "currHp is required" },
        { status: 400 }
      );
    }

    // Find the character by ID
    const character = await mongoose.model('CharacterSheet').findById(params.id);

    if (!character) {
      return NextResponse.json(
        { message: "Character not found" },
        { status: 404 }
      );
    }

    // Check if currHp exceeds hpMax
    if (currHp > character.hpMax) {
      return NextResponse.json(
        { message: "currHp cannot exceed hpMax" },
        { status: 400 }
      );
    }

    // Update currHp
    character.currHp = currHp;
    await character.save();

    return NextResponse.json(character);
  } catch (error: any) { // Cambiamos el tipo de error a 'any'
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
