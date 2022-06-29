import React from "react";
import "./SignUp.css";
import { useState } from "react";

function SignUp({ account }) {
  const [signForm, setSignForm] = useState({
    email: "",
    pwd: "",
    pwd_chk: "",
    nick_name: "",
  });

  const clickSignUp = async () => {
    try {
      fetch("http://localhost:3001/dd", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ signForm }),
      });
      // .then((res) => res.json())
      // .then((json) => {
      //   console.log("json = " + json);
      //   // this.setSignForm({
      //   //   data: json.user_id,
      //   // })
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setSignForm({
      ...signForm,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(signForm.email);
  // console.log(signForm.pwd);
  // console.log(signForm.pwd_chk);
  // console.log(signForm.nick_name);

  return (
    <div className="signupWrapper">
      <div className="signupItems">
        <div className="signupTitle"></div>
        <div className="signupForm">
          <div>
            <input
              className="signupInput"
              type="text"
              name="email"
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className="signupInput"
              type="password"
              name="pwd"
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className="signupInput"
              type="password"
              name="pwd_chk"
              placeholder="Password Confirm"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className="signupInput"
              type="text"
              name="nick_name"
              placeholder="Nickname"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="signup_btn_wrap">
          <div className="signup_btn_item">
            <div className="signup_btn_wallet">Connect Wallet</div>
            <div>
              <div className="signup_btn" onClick={clickSignUp}>
                Create Account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
