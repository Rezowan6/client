import API from "../../api/api.js";

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
    `/auth/verify-email/${token}`,
  );
  return res.data;
};

// login user
export const loginUser = async (data) => {

  const res = await API.post("/auth/login", data);

  const { accessToken } = res.data.data;

  localStorage.setItem("accessToken", accessToken);

  return res.data;
};



