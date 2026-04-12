/**
 * Component এর বাইরে থেকেও navigate করা
service / axios / utils থেকেও navigate করা

তাহলে navigate reference store করতে হবে।
 */

let navigate;

export const setNavigator = (nav) => {
  navigate = nav;
};

export const navigator = (route) => {
  if (navigate && route) {
    navigate(route);
  }
};
