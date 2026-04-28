import API from "../../api/api";

// make sub admin
export const makeSubAdmin = async (data) => {
  const res = await API.patch("/admin/assign-role", data);
  return res.data;
};
// get
export const getSubAdmin = async (data) => {
  const res = await API.get("/admin/assign-role", data);
  return res.data;
};
