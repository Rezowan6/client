const costConfigFunc = ({ editId }) => {
  const costConfig = {
    title: "Cost add",

    form: {
      fields: [
        { name: "cost", type: "number", label: "cost" },
        { name: "desc", type: "text", label: "desc" },
        { name: "signature", type: "text", label: "signature" },
      ],
    },

    buttons: [{ type: "submit", text: `${editId ? "Update" : "Submit"}`, action: "submit" }],
  };
  return costConfig;
};

export default costConfigFunc;
