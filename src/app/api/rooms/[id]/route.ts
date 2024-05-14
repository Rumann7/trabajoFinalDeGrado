import { NextResponse } from "next/server";
import Sala from "@/models/sala";
import { connectDB } from "@/libs/mongodb";
import CharacterSheet from "@/models/characterSheet";

export async function DELETE(request: any, { params }: any) {
  try {
    connectDB();
    const deletedRoom = await Sala.findByIdAndDelete(params.id);

    if (!deletedRoom) {
      return NextResponse.json({ message: "room not found" }, { status: 404 });
    }

    return NextResponse.json(deletedRoom);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function POST(request: any, { params }: any) {
  try {
    connectDB();

    const roomFound = await Sala.findById(params.id);

    if (!roomFound) {
      return NextResponse.json(
        { message: "Sala no encontrada" },
        { status: 404 }
      );
    }

    const data = await request.json();
    const characterFound = await CharacterSheet.findById(data.csID);

    if (!characterFound) {
      return NextResponse.json(
        { message: "personaje no encontrado" },
        { status: 404 }
      );
    }

    // Verifica si el usuario ya está presente en la lista de participantes
    if (roomFound.characterSheets.includes(characterFound)) {
      return NextResponse.json(
        { message: "Usuario ya es participante de esta sala" },
        { status: 400 }
      );
    }

    // Si el usuario no está presente, agrégalo como participante
    roomFound.participantes.push(characterFound);
    await roomFound.save();

    return NextResponse.json(
      { message: "Personaje agregado perfectamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
