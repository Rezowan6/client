const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export const sortDate = (data) => {
  return [...data].sort((a, b) => {
    return parseDate(a.date) - parseDate(b.date);
  });
};