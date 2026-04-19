import { useGetUsersQuery } from "../../features/users/userApi";
import AlertPopup from "../alertPopup/AlertPopup";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ReusableTable from "../table/ReusableTable";

const ReusableCrudPage = ({
  config,
  title = "wellcome",
  items,
  values,
  handleChange,
  handleSubmit,
  actions,
  editId,
  totalText,
  grandTotal = true,
  totalEgg = null,
  errors,
  alertData,
  closeAlert,
  confirmAction,
  table = true,
}) => {
  const { data: allUser } = useGetUsersQuery();

  const users = allUser?.data?.users || [];

  const optionsMap = {
    users: users.map((u) => ({
      label: u.name,
      value: u._id,
    })),
  };

  return (
    <section className="w-full">
      <h1 className="text-3xl text-cyan-500 py-4">{title}</h1>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {config.form.fields.map((field) => {
          //  CHECKBOX SUPPORT
          if (field.type === "checkbox") {
            return (
              <div key={field.name} className="py-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={field.name}
                    data-group={field.dataGroup}
                    checked={values?.[field.name] || false}
                    onChange={handleChange}
                  />

                  <label htmlFor={field.name}>{field.label}</label>
                </label>
              </div>
            );
          }
          // SELECT SUPPORT
          if (field.type === "select") {
            return (
              <div key={field.name} className="py-4 w-1/4">
                <label className="block text-white pb-1">{field.label}</label>

                <select
                  name={field.name}
                  value={values?.[field.name] || ""}
                  onChange={handleChange}
                  required={field.required} // ADD THIS
                  className="text-black border p-2"
                >
                  <option value="">{field.label}</option>

                  {optionsMap[field.optionsKey]?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {errors?.[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
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
      {grandTotal && (
        <div className="text-2xl text-cyan-500 text-end pb-4">
          <h3>
            {totalText}: {grandTotal || 0}
          </h3>
          {totalEgg ? <p>Total Egg: {totalEgg}</p> : ""}
        </div>
      )}

      {/* TABLE */}
      {table && (
        <ReusableTable
          columns={config.table.columns}
          data={items}
          actions={actions}
        />
      )}

      {/* ALERT */}
      <AlertPopup
        {...alertData}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </section>
  );
};
export default ReusableCrudPage;
