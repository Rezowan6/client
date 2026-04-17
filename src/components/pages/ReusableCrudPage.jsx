import { useGetUsersQuery } from "../../features/users/userApi";
import AlertPopup from "../alertPopup/AlertPopup";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ReusableTable from "../table/ReusableTable";

const ReusableCrudPage = ({
  config,
  items,
  values,
  handleChange,
  handleSubmit,
  actions,
  editId,
  totalText,
  grandTotal,
  totalEgg=null,
  errors,
  alertData,
  closeAlert,
  confirmAction,
}) => {
  // console.log(alertData)
  const { data: allUser } = useGetUsersQuery();

  const users = allUser?.data?.users || [];

  const optionsMap = {
    users: users.map((u) => ({
      label: u.name,
      value: u._id,
    })),
  };

  return (
    <div className="text-white p-6">
      {/* FORM */}
      <form onSubmit={handleSubmit}>

        {config.form.fields.map((field) => {
          if (field.type === "select") {
            return (
              <select
                key={field.name}
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                className="text-black"
              >
                <option value="">Select</option>

                {optionsMap[field.optionsKey]?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );
          }

          return (
            <div key={field.name} className="w-1/2 lg:w-1/4 py-4">
              <Input
                key={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={handleChange}
                label={field.label}
                error={errors[field.name]}
              />
            </div>
          );
        })}

        <Button type="submit" text={editId ? "Update" : "Submit"} />
      </form>

      {/* TOTAL */}
      <div className="text-2xl text-cyan-500 text-end pb-4">
        <h3>{totalText}: {grandTotal || 0}</h3>
        {totalEgg ? <p>Total Egg: {totalEgg}</p> : ''}
      </div>

      {/* TABLE */}
      <ReusableTable
        columns={config.table.columns}
        data={items}
        actions={actions}
      />

      {/* ALERT */}
      <AlertPopup
        {...alertData}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </div>
  );
};
export default ReusableCrudPage;
