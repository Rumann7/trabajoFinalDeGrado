interface LoginInputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  pattern: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInputPattern: React.FC<LoginInputProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  pattern,
}) => (
  <input
    type={type}
    id={id}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    pattern={pattern}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  ></input>
);

export default LoginInputPattern;
