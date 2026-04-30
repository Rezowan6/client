import API from "../../api/api";

export const adminTransfer = async (data) => {
  const res = await API.patch("/admin/transfer-main-admin", data);
  return res.data;
};
