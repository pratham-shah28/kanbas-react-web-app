import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import Users from "./Users";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <div className="d-flex">
      <div className="d-none d-md-block">
          <AccountNavigation/>
            </div>
      <div className="flex-fill">
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Users/:uid" element={<Users />} />
      </Routes>
      </div>
    </div></div>
);}
