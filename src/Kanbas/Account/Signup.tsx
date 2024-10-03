import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container">
      <div className="row justify-content">
        <div className="col-md-4">
          <h3 className="">Signup</h3>
          <div className="mb-3">
            <input
              placeholder="username"
              className="form-control"
              type="text"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="password"
              className="form-control"
              type="password"
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="verify password"
              className="form-control"
              type="password"
            />
          </div>
          <Link
            to="/Kanbas/Account/Profile"
            className="btn btn-primary w-100"
          >
            Signup
          </Link>
          <div className="mt-3">
            <Link to="/Kanbas/Account/Signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
