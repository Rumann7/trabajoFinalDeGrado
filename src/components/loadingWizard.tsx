import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          src="/images/walkingWizard.gif"
          alt="Loading..."
          height={100}
          width={100}
        />
        <div className="mt-4 font-serif text-white text-2xl">Conjurando...</div>
      </div>
    </div>
  );
}
