import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";

const resend = new Resend("re_MuAbzCDi_HxE3VJ2TRTf8wvQuhMsrewZS");

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parsear el cuerpo de la solicitud para obtener los datos

    console.log(body); // Asegúrate de que estás recibiendo los datos correctamente

    const data = await resend.emails.send({
      from: "DND ADMIN <onboarding@resend.dev>",
      to: ["rubenmanzanosanta@gmail.com"],
      subject: "Invitación a encrucijada",
      react: EmailTemplate({
        sender: body.sender,
        firstName: body.firstName,
        roomId: body.roomId,
      }),
      text: "Hello from Resend and Nextjs",
    });

    console.log(data);

    return NextResponse.json(
      { message: "Email sent" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
