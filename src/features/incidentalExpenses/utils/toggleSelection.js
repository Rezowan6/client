export const toggleSelection = (prev, id) => {
  return prev.includes(id)
    ? prev.filter((item) => item !== id)
    : [...prev, id];
};