import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

export async function DELETE(request: any, { params }: any) {
  try {
    connectDB();
    const deletedRoom = await mongoose.model('Sala').findByIdAndDelete(params.id);

    if (!deletedRoom) {
      return NextResponse.json({ message: "room not found" }, { status: 404 });
    }

    return NextResponse.json(deletedRoom);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function GET(request: any, { params }: any) {
  try {
    connectDB();

    const roomFound = await mongoose.model('Sala').findById(params.id).populate({
      path: "characterSheets",
      model: "CharacterSheet",
    });

    if (!roomFound) {
      return NextResponse.json({ message: "room not found" }, { status: 404 });
    }

    return NextResponse.json(roomFound);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function POST(request: any, { params }: any) {
  try {
    connectDB();

    const roomFound = await mongoose.model('Sala').findById(params.id);

    if (!roomFound) {
      return NextResponse.json(
        { message: "Sala no encontrada" },
        { status: 404 }
      );
    }

    const data = await request.json();
    const characterFound = await mongoose.model('CharacterSheet').findById(data.csID);

    console.log(characterFound);

    if (!characterFound) {
      return NextResponse.json(
        { message: "personaje no encontrado" },
        { status: 404 }
      );
    }

    roomFound.characterSheets.push(characterFound);
    await roomFound.save();

    console.log(roomFound);

    return NextResponse.json(
      { message: "Personaje agregado perfectamente" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 400 });
  }
}

export async function PATCH(request: any, { params }: any) {
  try {
    connectDB();
    const { csID } = await request.json(); // Obtener el ID del personaje a eliminar

    const roomFound = await mongoose.model('Sala').findById(params.id);
    if (!roomFound) {
      return NextResponse.json(
        { message: "Sala no encontrada" },
        { status: 404 }
      );
    }

    const characterIndex = roomFound.characterSheets.indexOf(csID);
    if (characterIndex === -1) {
      return NextResponse.json(
        { message: "Personaje no encontrado en la sala" },
        { status: 404 }
      );
    }

    roomFound.characterSheets.splice(characterIndex, 1); // Eliminar el personaje de la lista
    await roomFound.save();

    return NextResponse.json(
      { message: "Personaje eliminado correctamente", characterId: csID },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
