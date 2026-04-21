const eggRateConfig = {
  title: "Egg Rate",

  form: {
    fields: [
      { name: "eggRate", type: "eggRage", label: "Egg-Rate" },
      { name: "soldProduct", type: "soldProduct", label: "Sold-Product" },
    ],
  },

  buttons: [
      { type: "submit", text: "Submit", action: "submit" },
    ],
};

export default eggRateConfig;