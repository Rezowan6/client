import Style from "./button.module.css";

const Button = ({ type = "button", text = "add", onclickHandle }) => {
  return (
    <>
      <button
        className={`${Style.btn} w-full sm:w-32`}
        type={type}
        onClick={onclickHandle}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
