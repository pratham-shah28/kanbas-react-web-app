import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
// import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import { Navigate, Route, Routes } from "react-router";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses() {
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      Course 1234 </h2> <hr />

      <hr />
      <div className="d-flex">
    <div className="d-none d-md-block">
            <CoursesNavigation />
            </div>
            <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<h2>Home</h2>} />
              <Route path="Modules" element={<Modules/>} />
              <Route path="Assignments" element={<h2><Assignments/></h2>} />
              <Route path="Assignments/:aid" element={<h2><AssignmentEditor/></h2>} />
              <Route path="People" element={<h2>People</h2>} />
            </Routes>
            </div></div>
    </div>
);}
