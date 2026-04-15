import API from "../api/api";

// custom axios base query
export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await API({
        url,
        method,
        data,
        params,
      });

      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };
