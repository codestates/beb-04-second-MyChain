import React from "react";
import "./SignUp.css";
import { useState, useEffect } from "react";

function SignUp() {
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
    <div>
      <nav>
        <div>
          <h1>회원가입</h1>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="이메일"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="pwd"
            placeholder="비밀번호"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="pwd_chk"
            placeholder="비밀번호 확인"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="nick_name"
            placeholder="닉네임"
            onChange={onChange}
          />
        </div>
        <div>지갑연결</div>
        <div>
          <button className="SignUpBtn" onClick={clickSignUp}>
            가입하기
          </button>
        </div>
      </nav>
    </div>
  );
}

export default SignUp;
