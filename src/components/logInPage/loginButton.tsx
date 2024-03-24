interface LoginButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Cambiado para aceptar un evento de mouse
}

const LoginButton: React.FC = () => (
  <button
    type="submit"
    className="w-full bg-blue-700 text-white py-2 rounded font-bold hover:bg-blue-800 transition-colors"
  >
    Iniciar sesión
  </button>
);

export default LoginButton;
