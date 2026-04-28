export const linkRoutes = {
  meal: (item) => `/mill/${item.userId}`,

  basaVara: (item) =>
    `/montly-basaVara/${item.userId}`,

  currentBill: (item) =>
    `/currentBill/${item.userId}`,

  khalaBill: (item) =>
    `/khalaBill/${item.userId}`,

  balance: (item) =>
    `/balance/${item.userId}`,

  egg: (item) =>
    `/egg/${item.userId}`,
};