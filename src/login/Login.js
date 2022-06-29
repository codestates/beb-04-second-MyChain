import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login_Wrapper">
      <div className="login_Items">
        <div className="login_Title"></div>
        <div className="login_Form">
          <div>
            <input
              className="login_Input"
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="login_Input"
              type="password"
              name="pwd"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="login_btn_wrap">
          <div className="login_btn_item">
            <div>
              <div className="login_btn">Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
