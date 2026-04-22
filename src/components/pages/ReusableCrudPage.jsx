import useOptionsMap from "../../hooks/useOptionsMap";
import FieldRenderer from "../form/FieldRenderer";

import AlertPopup from "../alertPopup/AlertPopup";
import Button from "../Button/Button";
import ReusableTable from "../table/ReusableTable";
import Title from "../title/Title";

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
  link,
  onSelectUser,
  selectedUsers,
  quickAdd,
}) => {
  const optionsMap = useOptionsMap();

  return (
    <>
      <Title title={title} />
      <section
        className={`flex justify-center items-center min-h-[60vh] sm:min-h-[50vh]`}
      >
        <div className="shadow-[0_0_50px_#0ef] p-10 rounded-2xl">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-10 justify-center items-center w-full  lg:flex-row"
          >
            {config.form.fields.map((field) => {
              return (
                <FieldRenderer
                  key={field.name}
                  field={field}
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  optionsMap={optionsMap}
                />
              );
            })}

            <Button type="submit" text={editId ? "Update" : "Submit"} />
          </form>
        </div>
      </section>

      {/* TOTAL */}
        <div className="text-2xl text-cyan-500 text-end pb-4">
          <h3>
           {totalText}:{grandTotal || 0}
          </h3>
          {totalEgg ? <p>Total Egg: {totalEgg}</p> : ""}
        </div>

      {/* TABLE */}
      {table && (
        <ReusableTable
          columns={config.table.columns}
          data={items}
          actions={actions}
          link={link}
          onSelectUser={onSelectUser}
          selectedUsers={selectedUsers}
          quickAdd={quickAdd}
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
