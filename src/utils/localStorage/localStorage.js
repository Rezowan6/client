export const getLocalUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.log(error);
    console.log("Invalid user in localStorage");
    localStorage.removeItem("user");
    return null;
  }
};

export const getSafeUser = () => {
  const user = getLocalUser();

  return {
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    admin: user?.admin || null,
    raw: user || {},
  };
};
