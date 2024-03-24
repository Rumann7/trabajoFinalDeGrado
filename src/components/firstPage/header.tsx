import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-300 flex justify-between items-center p-2 px-40 fixed w-full top-0 z-10">
      <div className="flex">
        <Image src="/images/logo.png" alt="Logo" width="50" height="60" />
        <Image src="/images/text.png" alt="Texto" width="300" height="50" />
      </div>
      <div>
        <a
          href="/login"
          className="bg-gray-500 text-white font-bold py-3 px-4 rounded mr-2 transition duration-300 ease-in-out transform hover:bg-gray-600"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="bg-gray-500 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:bg-gray-600"
        >
          Sign in
        </a>
      </div>
    </header>
  );
};

export default Header;
