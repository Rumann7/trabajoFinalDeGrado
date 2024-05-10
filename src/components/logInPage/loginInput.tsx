import React from "react";

interface LoginInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
}

const LoginInput: React.FC<LoginInputProps> = ({
  type,
  id,
  name,
  placeholder,
}) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    className="appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 hover:bg-gray-200 focus:bg-white shadow-md"
  />
);

export default LoginInput;
