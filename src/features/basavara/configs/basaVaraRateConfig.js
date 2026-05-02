const basaVaraRateFunc = (editId) => {
  const basaVaraRateConfig = {
  title: "BasaVara-Rate",
  form: {
    fields: [
      {
        name: "balance1",
        type: "number",
        label: "Balance",
      },
      {
        name: "balance2",
        type: "number",
        label: "Balance",
      },
    ],
  },
    buttons: [
      { type: "submit", text:`${editId ? "Update" : "Submit"}`, action: "submit" },
    ],
}

return basaVaraRateConfig;
}

export default basaVaraRateFunc;