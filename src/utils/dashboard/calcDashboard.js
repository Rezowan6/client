export const calculateUserFinancials = ({
  users,
  balanceUsers,
  millUsers,
  incidentalUsers,
  grandTotalCost,
  grandTotalMill,
  eggRate,
  soldProduct,
}) => {
  const balanceMap = {};
  const millMap = {};
  const incidentalMap = {};
  const eggMap = {};

  let totalEggCost = 0;
  let totalIncidentalCost = 0;

  // balance map
  balanceUsers?.forEach((u) => {
    balanceMap[String(u.userId)] = u.totalTk;
  });

  // mill map
  millUsers?.forEach((u) => {
    millMap[String(u.userId)] = u.totalMill;
  });

  // incidental + egg cost calculate FIRST
  incidentalUsers?.forEach((u) => {
    const eggCost = u.totalEgg * eggRate;

    incidentalMap[u.userId] = u.totalOtherCost;
    eggMap[u.userId] = eggCost;

    totalEggCost += eggCost;
    totalIncidentalCost += u.totalOtherCost;
  });

  // total other cost
  const otherstotaluserCost = totalEggCost + totalIncidentalCost + soldProduct;

  // grand cost without egg + incidental
  const finalTotalGrandCost = grandTotalCost - otherstotaluserCost;

  // per mill
  const perMill = grandTotalMill > 0 ? finalTotalGrandCost / grandTotalMill : 0;

  // user calculation
  const usersData = users?.map((user) => {
    const userTk = balanceMap[user._id] || 0;
    const userMill = millMap[user._id] || 0;

    const eggCost = eggMap[user._id] || 0;
    const incidentalCost = incidentalMap[user._id] || 0;

    const otherCost = eggCost + incidentalCost;

    const expense = userMill * perMill + otherCost;

    const remainingBalance = userTk - expense;

    return {
      id: String(user._id),
      name: user.name,
      totalMoney: userTk,
      totalMill: userMill,
      expense,
      balance: remainingBalance,
      eggCost,
      incidentalCost,
    };
  });

  return {
    usersData,
    totals: {
      perMill,
      totalEggCost,
      totalIncidentalCost,
    },
  };
};
