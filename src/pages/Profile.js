import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="loginWrapper">
      <div className="loginItems">
        <Link to="/login">
          <div className="signupBtn">Login</div>
        </Link>

        <Link to="/signup">
          <div className="loginBtn">Sign Up</div>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
