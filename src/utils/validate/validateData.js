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
// other Cost
export const validateIncedentalExpenses = (values) => {
  const errors = {};

  const { otherCost, egg,totalOtherCost, } = values;

  // required email
  if (!otherCost && !egg && !totalOtherCost) {
    errors.otherCost = "OtherCost is required";
  }
  if (!egg && !otherCost && !totalOtherCost) {
    errors.egg = "Egg is required";
  }
  if (!egg && !otherCost && !totalOtherCost) {
    errors.totalOtherCost = "TotalOtherCost is required";
  }

  return errors;
};
// permanent info
export const validatePermanentInfo = (values) => {
  const errors = {};

  const { location,  mobileNumber, department, semester  } = values;

  // required email
  if (!location ) {
    errors.location = "Location is required";
  }
  if (!mobileNumber ) {
    errors.mobileNumber = "MobileNumber is required";
  }
  if (!department ) {
    errors.department = "department is required";
  }
  if (!semester ) {
    errors.semester = "semester is required";
  }

  return errors;
};

// role
export const validateRole = (values) => {
  const errors = {};

  const {userId, role } = values;

  // required email
  if (!userId ) {
    errors.userId = "User id is required";
  }
  if (!role ) {
    errors.role = "Role is required";
  }

  return errors;
};
// eggRate
export const eggRateValidator = (values) => {
  const errors = {};

  const { eggRate, soldProduct } = values;

  // required email
  if (!eggRate && !soldProduct) {
    errors.eggRate = "Egg Rate is required";
  }
  if (!soldProduct && !eggRate ) {
    errors.soldProduct = "Sold Product is required";
  }

  return errors;
};
