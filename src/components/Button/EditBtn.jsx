import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const EditBtn = ({ action }) => {
  if (action === "edit") {
    return <CiEdit className="text-blue-500 text-lg" />;
  }

  if (action === "delete") {
    return <MdOutlineDelete className="text-red-500 text-lg" />;
  }

  return null;
};

export default EditBtn;
