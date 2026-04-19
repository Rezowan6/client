const costConfigFunc = ({ editId }) => {
  const costConfig = {
    title: "Cost add",

    form: {
      fields: [
        { name: "cost", type: "cost", label: "cost" },
        { name: "desc", type: "desc", label: "desc" },
        { name: "signature", type: "signature", label: "signature" },
      ],
    },

    buttons: [{ type: "submit", text: `${editId ? "Update" : "Submit"}`, action: "submit" }],
  };
  return costConfig;
};

export default costConfigFunc;
