export const getLocalUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.log(error)
    console.log("Invalid user in localStorage");
    localStorage.removeItem("user");
    return null;
  }
};