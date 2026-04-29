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
// set-password
export const setpassword = async ({data, token}) => {

  const res = await API.post(`/auth/set-password/${token}`, data);

  console.log(res)

  const { accessToken } = res.data.data;

  localStorage.setItem("accessToken", accessToken);

  return res.data;
};

// logout
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res?.data;
}

// authService.js
export const getCurrentUser = async () => {
  const res = await API.get("/auth/me");

  return res?.data?.data;
};


