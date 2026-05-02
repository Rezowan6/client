export const getUserBalance = (data, userId) => {
  return (
    data?.data?.users?.find((u) => String(u?.userId) === String(userId)) || null
  );
};
