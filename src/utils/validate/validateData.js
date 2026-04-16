// Balance
export const validateBalance = (values) => {
  const errors = {};

  const { tk, userId  } = values;

  // required email
  if (!userId) {
    errors.userId = "User is required";
  }
  if (!tk) {
    errors.tk = "Balance is required";
  }

  return errors;
};

// Mill
export const validateMill = (values) => {
  const errors = {};

  const { mill, userId  } = values;

  // required email
  if (!userId) {
    errors.userId = "User is required";
  }
  if (!mill) {
    errors.mill = "Mill is required";
  }

  return errors;
};

// Cost
export const validateCost = (values) => {
  const errors = {};

  const { cost, desc, signature } = values;

  // required email
  if (!cost) {
    errors.cost = "Cost is required";
  }
  if (!desc) {
    errors.desc = "Desc is required";
  }
  if (!signature) {
    errors.signature = "signature is required";
  }

  return errors;
};
// Cost
export const validateIncedentalExpenses = (values) => {
  const errors = {};

  const { otherCost, egg, } = values;

  // required email
  if (!otherCost && !egg) {
    errors.otherCost = "OtherCost is required";
  }
  if (!egg && !otherCost) {
    errors.egg = "Egg is required";
  }

  return errors;
};
