import { Link, useParams, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  // Use useParams to retrieve the course ID
  const { cid } = useParams<{ cid: string }>(); 
  const { pathname } = useLocation(); // Get the current path

  // List of navigation links
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = pathname === linkPath; // Check if the link is active

        return (
          <Link
            key={link}
            to={linkPath}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
