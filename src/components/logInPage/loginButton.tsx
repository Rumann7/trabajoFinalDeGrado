interface LoginButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Cambiado para aceptar un evento de mouse
}

const LoginButton: React.FC = () => (
  <button
    type="submit"
    className="w-full bg-blue-700 shadow text-white font-bold py-2 px-4 rounded-md mr-2 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105"
  >
    Continuar
  </button>
);

export default LoginButton;
