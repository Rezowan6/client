import API from "../api/api.js";

// register user
export const registerUser = async (data) => {
  const res = await API.post(
    "/auth/register",
    data
  );
  return res.data;
};

// verify email 
export const verifyEmail = async (token) => {
  const res = await API.get(
    `/auth/register/${token}`,
  );
  return res.data;
};

