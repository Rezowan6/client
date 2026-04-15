import API from "../../api/api";

// create user
export const createBalance = async (data) => {

  const res = await API.post(
    "/admin/months/user-balances",
    data
  );

  return res.data;
};




// add tk
export const addBalances = async (data) => {

  const res = await API.post(
    "/admin/months/user-balances",
    data,
  );

  return res.data;
};
