const Button = ({ type = "button", text = "add", onclickHandle }) => {
  return (
    <>
      <button
        className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-4 py-2 rounded-md w-1/2 lg:w-1/3 font-medium hover:opacity-90 transition"
        type={type}
        onClick={onclickHandle}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
