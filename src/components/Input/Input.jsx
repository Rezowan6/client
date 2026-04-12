const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}:

          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`${placeholder}:`}
        disabled={disabled}
        className={`
          w-full
          px-4 py-2
          border
          rounded-lg
          bg-white
          text-gray-800
          placeholder-gray-400
          
          focus:outline-none
          focus:ring-2
          focus:ring-teal-500
          focus:border-teal-500
          
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          
          transition-all
          duration-200
          
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
        `}
      />

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
