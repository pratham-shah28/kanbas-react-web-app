import "./index.css";
import { BsFileText, BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaSearch } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import * as db from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {
  const { cid } = useParams(); // Extract course ID from URL parameters
  const assignments = db.assignments; // Fetch assignments from database

  return (
    <div id="wd-assignments" className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="position-relative" style={{ width: "300px" }}>
          <input
            id="wd-search-assignment"
            className="form-control"
            placeholder="Search..."
            style={{ paddingLeft: "35px" }}
          />
          <FaSearch
            className="position-absolute"
            style={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#888",
              fontSize: "15px",
            }}
          />
        </div>
        <div>
          <button
            id="wd-groups-btn"
            className="btn btn-lg btn-secondary me-1"
            type="button"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Groups
          </button>
          <button
            id="wd-assignment-btn"
            className="btn btn-lg btn-danger me-1 float-end"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            ASSIGNMENTS
          </button>
        </div>
      </div>

      <div id="wd-modules">
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              Assignments
              <div className="float-end">
                <button id="wd-40-btn">40% of Total</button>
                <FaPlus />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {assignments
                .filter((assignment) => assignment.course === cid)
                .map((assignment) => (
                  <li
                    key={assignment._id}
                    className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center border-green"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <BsFileText className="me-2 fs-3" />
                    <div>
                      <a
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                        className="text-decoration-none text-dark"
                      >
                        {assignment.title}
                      </a>
                      <br />
                      <span className="text-danger">Multiple Modules</span> |
                      Not available until May 23 at 12:00am |
                      <br /> Due March 28 at 11:59pm | 100 pts
                    </div>
                    <LessonControlButtons />
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
