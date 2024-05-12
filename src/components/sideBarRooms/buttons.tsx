import { useRouter } from "next/navigation";

interface barButtonProps {
  url: string;
  content: string;
}

const BarButton: React.FC<barButtonProps> = ({ url, content }) => {
  const router = useRouter();

  return (
    <li>
      <button
        onClick={() => router.push(`${url}`)}
        className="w-full text-left py-3 px-4 my-2 text-white transition rounded duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105"
      >
        {content}
      </button>
    </li>
  );
};

export default BarButton;
