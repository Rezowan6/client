import axios from "axios";

const API = axios.create({
  baseURL: "https://mas-hostel-management-app.onrender.com/api",
  withCredentials: true,
});


//  Response interceptor
API.interceptors.response.use(

  // success
  (response) => response,

  // error
  async (error) => {

    const originalRequest = error.config;

    //  token expired → refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        await axios.post(
          "https://mas-hostel-management-app.onrender.com/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        return API(originalRequest);

      } catch (err) {

        console.log("Refresh failed", err);

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;