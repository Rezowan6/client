import API from "../../api/api";

// make sub admin
export const makeSubAdmin = async (data) => {
  const res = await API.patch("/admin/assign-role", data);
  return res.data;
};
