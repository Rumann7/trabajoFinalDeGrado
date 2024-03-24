interface LoginInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  ></input>
);

export default LoginInput;
