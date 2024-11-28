import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";


export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <button className="btn btn-outline-secondary">40% of Total</button>
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}