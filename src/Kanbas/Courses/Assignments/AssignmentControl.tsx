import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import EditAccess from "../EditAccess";

export default function AssignmentControl() {
  const { cid } = useParams();
  return (
    <EditAccess>
      <div id="wd-assignment-control" className="toolbar">
        <input
          type="text"
          placeholder="Search..."
          className="form-control-lg me-1"
        />
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments/New`}
          className="btn btn-lg btn-danger me-1 float-end"
        >
          <FaPlus className="me-2 fs-5" /> Assignment
        </Link>
        <button
          id="wd-add-group-btn"
          className="btn btn-lg btn-secondary me-1 float-end"
        >
          <FaPlus className="me-2 fs-5" /> Group
        </button>
      </div>
    </EditAccess>
  );
}