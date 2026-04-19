import { useState } from "react";

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});


  // input change handler
  const handleChange = (e) => {
    const { name, value, type, checked, dataset, } = e.target;

    const groupName = dataset.group;

    const val = type === "checkbox" ? checked : value;

    setValues((prev) => {
      const updatedValues = {
        ...prev,
        [name]: val,
      };

      if (type === "checkbox" && groupName) {

        // reset only same group
        Object.keys(updatedValues).forEach((key) => {

          if (typeof updatedValues[key] === "boolean" && key !== groupName ) {
            updatedValues[key] = false;
          }
        });

        if (checked) {
          updatedValues[name] = true;
          updatedValues[groupName] = name;
        } else {
          updatedValues[groupName] = "";
        }
      }

      // live validation
      if (validate) {
        const validationErrors = validate(updatedValues);
        setErrors(validationErrors);
      }

      return updatedValues;
    });
  };

  // validation run
  const validateForm = () => {
    if (!validate) return true;

    const newErrors = validate(values);

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit handler
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      callback(values);
    }
  };

  // reset form
  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
