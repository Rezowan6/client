import AlertPopup from "../alertPopup/AlertPopup";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Form = ({
  values,
  errors,
  config,
  resetForm,
  handleSubmit,
  handleChange,
  alertData,
  closeAlert,
  confirmAction,
}) => {
  return (
    <div className={`flex justify-center items-center min-h-[60vh] sm:min-h-[100vh]`}>
      <div className="shadow-[0_0_50px_#0ef] p-10 rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4"
        >
          <h1 className="pb-2 mb-2 text-[#0ef] text-2xl font-bold">
            {config?.title}
          </h1>
          {config?.form?.fields?.map((field) => {
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

          <div className="flex flex-col sm:flex-row justify-center items-center">
            {config?.buttons?.map((button) => (
              <Button
                key={button.text}
                type={button.type}
                text={button.text}
                onclickHandle={() => {
                  if (button.action === "reset") resetForm();
                }}
              />
            ))}
          </div>
        </form>
      </div>

      <AlertPopup
        {...alertData}
        onClose={closeAlert}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default Form;
