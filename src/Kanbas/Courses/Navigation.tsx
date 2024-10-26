import { Link } from "react-router-dom";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CoursesNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kanbas/Courses/1234/${link}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item text-danger border border-0 ${
            link === "Home" ? "active" : ""
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
