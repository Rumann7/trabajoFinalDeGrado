import * as React from "react";

interface EmailTemplateProps {
  sender: string;
  firstName: string;
  roomId: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  sender,
  firstName,
  roomId,
}) => (
  <div>
    <h1>¡Hola, {firstName}!</h1>

    <p>
      Yo soy {sender}. ¡Te doy la bienvenida a nuestra encrucijada! Has sido
      invitado a unirte a nuestra sala, donde encontrarás una variedad de
      personajes y oportunidades para explorar.
    </p>

    <p>Para comenzar tu aventura, simplemente haz clic en el botón de abajo:</p>

    <a
      href={`https://trabajo-final-de-grado-delta.vercel.app/dashboard/visitorRoom/${roomId}`}
      style={{
        backgroundColor: "#1D4ED8",
        padding: "8px 12px",
        color: "white",
        textDecoration: "none",
        display: "inline-block",
        borderRadius: "4px",
      }}
    >
      ¡Aceptar el desafío!
    </a>

    <p>¡Esperamos verte pronto en la sala!</p>

    <p>Saludos cordiales,</p>
    <p>Yo mismo, NYEH HEH HEH!</p>
  </div>
);
