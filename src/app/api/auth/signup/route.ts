import { NextResponse } from "next/server";
import User from "@/models/usuario";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { username, name, surname, email, password } = await request.json();
  console.log(username, name, surname, email, password);

  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
      surname,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      _id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      name: savedUser.name,
      surname: savedUser.surname,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
