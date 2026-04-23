export const buildSingleUserPayload = (userId, values) => ({
  userId,
  otherCost: values.otherCost,
  egg: values.egg,
});

// buildMultiUserPayload
export const buildMultiUserPayload = (userIds, totalOtherCost) => ({
  userIds,
  totalOtherCost: Number(totalOtherCost),
});

// build final user data
export const buildFinalUsersData = (users, items) => {
  const itemsMap = items.reduce((acc, item) => {
    acc[item.userId] = item;
    return acc;
  }, {});

  return users.map((user) => {
    const matched = itemsMap[user.value];

    return {
      userId: user.value,
      name: user.name,
      dailyData: matched?.dailyData || [],
      totalEgg: matched?.totalEgg || 0,
      totalOtherCost: matched?.totalOtherCost || 0,
    };
  });
};

