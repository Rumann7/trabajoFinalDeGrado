import { NextResponse } from "next/server";
import User from "@/models/usuario";
import { connectDB } from "@/libs/mongodb";
import bcript from "bcryptjs";

export async function POST(request: Request) {
  const { username, name, surname, email, password } = await request.json();
  console.log(username, name, surname, email, password);

  if (!password || password < 6)
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );

  try {
    //throw new Error('oogha booga');
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message:
            "threw d20 on creating account: rolled 1, Email already exists",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcript.hash(password, 12);

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
      password: savedUser.password,
      name: savedUser.name,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
