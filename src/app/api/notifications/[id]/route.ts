import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

export async function DELETE(request: any, { params }: any) {
  try {
    connectDB();
    const deletedNotification = await mongoose
      .model("Notification")
      .findByIdAndDelete(params.id);

    if (!deletedNotification) {
      return NextResponse.json({ message: "room not found" }, { status: 404 });
    }

    return NextResponse.json(deletedNotification);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request: any, { params }: any) {
  try {
    connectDB();
    const { read } = await request.json();

    const updatedNotification = await mongoose
      .model("Notification")
      .findByIdAndUpdate(params.id, { read }, { new: true });

    if (!updatedNotification) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNotification);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
