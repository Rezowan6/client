import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const EditBtn = ({ type, action, handleClick }) => {
  return (
    <button
      className={`${action === "delete" ? "text-white" : "text-cyan-600"} text-xl lg:text-2xl`}
      type={type}
      onClick={handleClick}
    >
      {action === "delete" ? <MdOutlineDelete /> : <CiEdit />}
    </button>
  );
};

export default EditBtn;
