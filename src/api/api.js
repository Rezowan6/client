import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
});


//  Request interceptor (AUTO attach token)
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


//  Response interceptor
API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // token expired → refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        // refresh call
        const res = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        //  save new token
        localStorage.setItem("accessToken", newAccessToken);

        //  retry with new token
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(originalRequest);

      } catch (err) {

        console.log("Refresh failed", err);

        // logout
        localStorage.removeItem("accessToken");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;