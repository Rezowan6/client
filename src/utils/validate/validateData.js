import {
  validateAtLeastOne,
  validateFields,
} from "../../helpers/validatorFields/validatorFields";

// Balance
export const validateBalance = (values) => {
  return validateFields(values, ["userId", "balance"]);
};
// basaVara
export const basaVaraValidator = (values) => {
  return validateFields(values, ["userId", "basaVara"]);
};
// basaVara Rate
export const basaVaraRateValidator = (values) => {
  return validateFields(values, ["balance"]);
};
// current bill
export const currentBillValidator = (values) => {
  return validateFields(values, ["userId", "balance"]);
};
// khala bill
export const khalaBillValidator = (values) => {
  return validateFields(values, ["userId", "balance"]);
};

// Mill
export const validateMill = (values) => {
  return validateFields(values, ["userId", "mill"]);
};

// Cost
export const validateCost = (values) => {
  return validateFields(values, ["cost", "desc", "signature"]);
};

// permanent info
export const validatePermanentInfo = (values) => {
  return validateFields(values, ["userId", "parmanent"]);
};

// role
export const validateRole = (values) => {
  return validateFields(values, ["userId", "role"]);
};

// ------------------- validateAtLeastOne ----------------------

// other Cost
export const validateIncedentalExpenses = (values) => {
  return validateAtLeastOne(values, [
    "userId",
    "otherCost",
    "egg",
    "totalOtherCost",
  ]);
};
// eggRate
export const eggRateValidator = (values) => {
  return validateAtLeastOne(values, ["eggRate", "soldProduct"]);
};
