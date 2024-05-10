import React from "react";

interface FormInputProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  required = false,
}) => (
  <div className="mb-4 flex items-center">
    {label && <label className="mr-2">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 focus:bg-gray-600 shadow-inner"
      required={required}
    />
  </div>
);

export default FormInput;
