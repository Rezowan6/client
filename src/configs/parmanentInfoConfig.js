const permanentInfoConfig = {
  form: {
    fields: [
      {
        name: "userId",
        type: "select",
        optionsKey: "users",
        label: "Select User",
      },
      {
        name: "location",
        type: "text",
        label: "Location",
      },
      {
        name: "mobileNumber",
        type: "text",
        label: "MobileNumber",
      },
      {
        name: "department",
        type: "text",
        label: "Department",
      },
      {
        name: "semester",
        type: "text",
        label: "Semester",
      },
    ],
  },

  table: {
    columns: [
      { key: "name", label: "Name" },
      { key: "location", label: "Location" },
      { key: "mobileNumber", label: "MobileNumber" },
      { key: "department", label: "Department" },
      { key: "semester", label: "Semester" },
    ],
  },
};

export default permanentInfoConfig;