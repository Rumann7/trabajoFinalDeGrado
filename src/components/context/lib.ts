import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let errorMessage = '';

export const login = async (formData: FormData) => {
  errorMessage = '';

  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    errorMessage = "Por favor, completa todos los campos.";
    return; 
  } else {
    const user = {
      username,
      password,
    };
      
    try {
      const response = await fetch(`http://192.168.2.105:8083/api/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        errorMessage = "Error en el usuario o contraseña";
        return; 
      }
  
      const { token, user_id } = await response.json();
      cookies().set("token", token);
      cookies().set("userId", user_id);
      
      errorMessage = '';
      redirect("/home");
    } catch(error) {
      errorMessage = "Error en el usuario o contraseña";
    }
  }
};


export const logout = async () => {
  cookies().delete("userId");
  cookies().delete("token");
  redirect("/");
};

export async function getSession() {
  const sessionToken = cookies().get("token")?.value;
  const sessionId = cookies().get("userId")?.value;

  return { sessionToken, sessionId };
}

export async function getError() {
  return errorMessage;
}