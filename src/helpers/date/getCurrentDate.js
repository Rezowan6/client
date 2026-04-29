export const getCurrentDateParts = () => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // padding (04, 09 format)
  const paddedDay = String(day).padStart(2, "0");
  const paddedMonth = String(month).padStart(2, "0");

  return {
    day,              
    month,            
    year,             

    fullDate: `${paddedDay}-${paddedMonth}-${year}`, // 09-04-2026
    monthYear: `${paddedMonth}-${year}`,             // 04-2026
  };
};