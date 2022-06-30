import React from "react";
import "./SignUp.css";
import { useState } from "react";

function SignUp({ account, onClickConnect }) {
  const [emailMessage, setEmailMessage] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");
  const [setResp] = useState("");
  const [signForm, setSignForm] = useState({
    email: "",
    pwd: "",
    nick_name: "",
    account: account,
    private_key: "",
  });
  // 이메일 유효성 검사
  const emailChk = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    const okFlag = regExp.test(e.target.value);
    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
    if (okFlag) {
      setEmailMessage("");
    } else {
      setEmailMessage("Email format is invalid !");
    }
  };
  //비밀번호 유효성 검사
  const pwdChk = () => {
    console.log("by name  = " + document.getElementsByName("pwd_chk")[0].value);
    if (signForm.pwd !== document.getElementsByName("pwd_chk")[0].value) {
      setPwdMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPwdMessage("");
    }
  };

  const clickSignUp = async () => {
    //가입진행
    if (
      emailMessage === "" &&
      signForm.email !== "" &&
      pwdMessage === "" &&
      signForm.pwd !== "" &&
      signForm.account !== ""
    ) {
      //유효성 검사 완료 시 진행
      try {
        fetch("http://localhost:3001/dd", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ signForm }),
        }).then((res) => res.json().then((msg) => setResp(msg["message"])));
      } catch (error) {
        console.error(error);
      }
    } else if (emailMessage !== "" || pwdMessage !== "") {
      alert("형식에 맞게 기입하시오");
    }
  };

  const onChange = (e) => {
    setSignForm({
      ...signForm,
      [e.target.name]: e.target.value,
    });
  };

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
              onBlur={emailChk}
            />
          </div>
          {emailMessage !== "" && (
            <div className="email_unable">{emailMessage}</div>
          )}
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
              onBlur={pwdChk}
            />
            <div style={{ color: "red" }}>{pwdMessage}</div>
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
          <div className="signup_btn_wrap">
            <div className="signup_btn_item">
              {account ? (
                <div>
                  <div className="signup_btn_connect">Wallet Connected</div>
                </div>
              ) : (
                <div>
                  <div className="signup_btn_wallet" onClick={onClickConnect}>
                    Connect Wallet
                  </div>
                </div>
              )}
              <div>
                <div className="signup_btn" onClick={clickSignUp}>
                  Create Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
