import Style from "./button.module.css";

const Button = ({ type = "button", text = "add", onclickHandle }) => {
  const length = text.length;
  return (
    <>
      <button
        className={`${Style.btn} w-[250px] flex justify-center items-center ${length > 8 ? "sm:w-52" : "sm:w-32"}`}
        type={type}
        onClick={onclickHandle}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
