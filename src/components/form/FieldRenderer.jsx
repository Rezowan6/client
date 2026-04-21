import Input from "../Input/Input";

const FieldRenderer = ({ field, values, handleChange, errors, optionsMap }) => {

  // CHECKBOX
  if (field.type === "checkbox") {
    return (
      <div>
        <label
          htmlFor={field.name}
          className={`
            w-[250px] flex items-center justify-center font-bold gap-3 cursor-pointer bg-[#107981] shadow-lg py-2 rounded-md
            ${field.dataGroup == "role" ? "sm:w-[130px]" : "sm:w-20"}
          `}
        >
          <input
            id={field.name}
            type="checkbox"
            name={field.name}
            data-group={field.dataGroup}
            checked={values?.[field.name] || false}
            onChange={handleChange}
            className="w-5 h-5 accent-[#0ef]"
          />

          <span>{field.label}</span>
        </label>
      </div>
    );
  }

  // SELECT
  if (field.type === "select") {
    return (
      <div className="sm:-mt-6">
        <label className="block text-cyan-400 pb-1">{field.label}</label>

        <select
          name={field.name}
          value={values?.[field.name] || ""}
          onChange={handleChange}
          required={field.required}
          className="p-3 w-[250px] bg-[#1c356b88] rounded-md outline-none"
        >
          <option>{field.label}</option>

          {optionsMap[field.optionsKey]?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>

        {errors?.[field.name] && (
          <p className="text-red-500 text-sm">{errors[field.name]}</p>
        )}
      </div>
    );
  }

  // DEFAULT INPUT
  return (
    <Input
      name={field.name}
      type={field.type}
      value={values[field.name]}
      onChange={handleChange}
      label={field.label}
      error={errors[field.name]}
    />
  );
};

export default FieldRenderer;
