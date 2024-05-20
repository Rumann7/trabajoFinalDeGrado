import { useRouter } from "next/navigation";
import React from "react";

interface BarButtonProps {
  url: string;
  content: string;
  isActive: boolean;
}

const BarButton: React.FC<BarButtonProps> = ({ url, content, isActive }) => {
  const router = useRouter();

  return (
    <li>
      <button
        onClick={() => router.push(`${url}`)}
        className={`w-full text-left py-3 px-4 my-2 text-white transition rounded duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105 ${
          isActive ? "bg-gray-700 scale-105" : ""
        }`}
      >
        {content}
      </button>
    </li>
  );
};

export default BarButton;
