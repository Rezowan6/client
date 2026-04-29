export const validateFields = (values, requiredFields) => {
  const errors = {};
  console.log(values);

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field} is required`;
    }
  });

  return errors;
};

export const validateAtLeastOne = (values, fields) => {
  const errors = {};

  console.log(values)

  const hasValue = fields.some((field) => values[field]);

  if (!hasValue) {
    fields.forEach((field) => {
      errors[field] = `${field} is required`;
    });
  }

  return errors;
};
