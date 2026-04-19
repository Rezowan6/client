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
    <>
    <h1 className="text-cyan-500 text-3xl">{title}</h1>
      <section
        className={`flex justify-center items-center min-h-[60vh] sm:min-h-[70vh]`}
      >
        <div className="shadow-[0_0_50px_#0ef] p-10 rounded-2xl">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-10 justify-center items-center w-full sm:flex-row"
          >
            {config.form.fields.map((field) => {
              //  CHECKBOX SUPPORT
              if (field.type === "checkbox") {
                return (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className={`
                          w-[250px]
                          flex items-center justify-center font-bold gap-3
                          cursor-pointer
                          bg-[#107981]
                          shadow-lg
                          py-2
                          rounded-md ${field.dataGroup == "role" ? "sm:w-[130px]" : "sm:w-20"}`}
                    >
                      <input
                        id={field.name}
                        type="checkbox"
                        name={field.name}
                        data-group={field.dataGroup}
                        checked={values?.[field.name] || false}
                        onChange={handleChange}
                        className="w-5 h-5 accent-[#0ef] cursor-pointer"
                      />

                      <span>{field.label}</span>
                    </label>
                  </div>
                );
              }
              // SELECT SUPPORT
              if (field.type === "select") {
                return (
                  <div key={field.name} className="sm:-mt-6">
                    <label className="block text-cyan-400 pb-1">
                      {field.label}
                    </label>

                    <select
                      name={field.name}
                      value={values?.[field.name] || ""}
                      onChange={handleChange}
                      required={field.required} // ADD THIS
                      className="p-3 w-[250px] bg-[#1c356b88] rounded-md outline-none"
                    >
                      <option>{field.label}</option>

                      {optionsMap[field.optionsKey]?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {errors?.[field.name] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <div key={field.name}>
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
        </div>
      </section>

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
    </>
  );
};
export default ReusableCrudPage;
