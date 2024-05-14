import { useState } from "react";
import FormInput from "../addCharacters/formInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RoomForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lore: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/users/getRooms/${session?.user?.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      router.push("/dashboard/yourRooms/myRooms");
    } catch (error) {
      console.error("Error adding lore:", error);
    }
  };

  const handleCancel = () => {
    router.back(); // Devuelve a la página anterior
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
        type={""}
      />
      <div>
        <textarea
          id="lore"
          name="lore"
          rows={3}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:bg-gray-600 shadow-inner"
          value={formData.lore}
          onChange={handleChange}
          placeholder="Lore"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Crear sala
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
