export const buildConfirmMessage = (values, selectedUsers) => {
  const parts = [];

  if (values.egg) parts.push(`Egg: ${values.egg}`);
  if (values.otherCost) parts.push(`Other Cost: ${values.otherCost}`);
  if (values.totalOtherCost)
    parts.push(`Total Cost: ${values.totalOtherCost} Users: ${selectedUsers.length}`);

  return parts.length ? parts.join(", ") : "No value entered";
};