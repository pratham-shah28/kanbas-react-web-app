import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"  alt='reactjs' width={100} height={100} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course"> 
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"  alt='nodejs' width={100} height={100} />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1235 Node JS
            </Link>
            <p className="wd-dashboard-course-title">
              Backend developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
          
           </div>
        <div className="wd-dashboard-course">  </div>
      </div>
    </div>
  );
}

