import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container ">
      <div className="">
        <div className="col-md-4">

          <h3 className="">Signin</h3>
          
          <div className="mb-3">
            <input
              id="wd-username"
              placeholder="username"
              className="form-control"
              type="text"
            />
          </div>

          <div className="mb-3">
            <input
              id="wd-password"
              placeholder="password"
              type="password"
              className="form-control"
            />
          </div>

          <Link
            id="wd-signin-btn"
            to="/Kanbas/Dashboard"
            className="btn btn-primary w-100"
          >
            Signin
          </Link>

          <div className=" mt-3">
            <Link id="wd-signup-link" to="/Kanbas/Account/Signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
