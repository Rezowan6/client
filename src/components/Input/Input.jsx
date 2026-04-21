import Style from "./input.module.css";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className={Style.input_box}>
      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder=" "
        onChange={onChange}
        disabled={disabled}
        className={`
      bg-[#1d2b3a]
    ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
  `}
      />
      {/* Label */}
      {label && <span htmlFor={name}>{label}</span>}

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
