import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container ">
      <div className="row justify-content">
        <div className="col-md-4">
          {/* Profile Header */}
          <h3 className="">Profile</h3>
          
          {/* Username Input */}
          <div className="">
            <label htmlFor="wd-username" className="form-label">Username</label>
            <input
              id="wd-username"
              value="alice"
              placeholder="username"
              className="form-control"
              type="text"
            />
          </div>

          {/* Password Input */}
          <div className="">
            <label htmlFor="wd-password" className="form-label">Password</label>
            <input
              id="wd-password"
              value="123"
              placeholder="password"
              type="password"
              className="form-control"
            />
          </div>

          {/* First Name Input */}
          <div className="">
            <label htmlFor="wd-firstname" className="form-label">First Name</label>
            <input
              id="wd-firstname"
              value="Alice"
              placeholder="First Name"
              className="form-control"
              type="text"
            />
          </div>

          {/* Last Name Input */}
          <div className="">
            <label htmlFor="wd-lastname" className="form-label">Last Name</label>
            <input
              id="wd-lastname"
              value="Wonderland"
              placeholder="Last Name"
              className="form-control"
              type="text"
            />
          </div>

          {/* Date of Birth Input */}
          <div className="">
            <label htmlFor="wd-dob" className="form-label">Date of Birth</label>
            <input
              id="wd-dob"
              value="2000-01-01"
              type="date"
              className="form-control"
            />
          </div>

          {/* Email Input */}
          <div className="">
            <label htmlFor="wd-email" className="form-label">Email</label>
            <input
              id="wd-email"
              value="alice@wonderland"
              type="email"
              className="form-control"
            />
          </div>

          {/* Role Selection */}
          <div className="">
            <label htmlFor="wd-role" className="form-label">Role</label>
            <select id="wd-role" className="form-select">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          {/* Sign out Link */}
          <div className=" ">
            <Link to="/Kanbas/Account/Signin" className="btn btn-danger w-100">
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
