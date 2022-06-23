import React from "react";
import { useState, useEffect } from "react";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    pwd: "",
  });

  const onChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const clickLogin = async () => {
    // alert("로그인버튼");
    try {
      fetch("http://localhost:3001/ff", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ loginForm }),
      });
      // .then((res) => {
      //   document.location.href = "/login";
      // });
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
  return (
    <div className="contain">
      <nav>
        <div>
          <h1>로그인</h1>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="이메일 입력"
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="pwd"
            placeholder="비밀번호 입력"
            onChange={onChange}
          />
        </div>
        <div>
          <button className="loginBtn" onClick={clickLogin}>
            로그인
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Login;
