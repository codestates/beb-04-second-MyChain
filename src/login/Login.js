import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { createTokens } from "../components/jwt.js";
//import { createTokens } from "../components/JWT";
// import dotenv from "dotenv";
//const dotenv = require("dotenv");
//const path = require("path");
// dotenv.config({
//   path: "../../.env",
// });

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isLogin, setLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    pwd: "",
  });
  let navigate = useNavigate();
  const onChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    //console.log("쿠키 아이디 = " + cookies.id);
    if (cookies.id !== undefined) {
      console.log(isLogin);
      setLogin(true);
    }
  }, []);
  const clickLogout = () => {
    //setCookie("id", null);
    removeCookie("id");
    setLogin(false);
  };
  const clickLogin = async () => {
    const id = loginForm.email;
    const pw = loginForm.pwd;

    const loginData = {
      loginType: "custom",
      id: id,
      pw: pw,
    };

    const url = "http://localhost:3001/ff";

    return axios
      .post(url, loginData)
      .then((response) => {
        if (response.status >= 200 && response.status <= 204) {
          // console.log("로그인됨");
          // console.log(response.data);
          setCookie("id", response.data.id);
        }
      })
      .then((res) => {
        // console.log("이동함");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.data);
        alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
      });
    /*
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
    */
  };
  return (
    <div className="contain">
      <nav>
        <div>
          <h1>로그인</h1>
        </div>
        {isLogin === false ? (
          <div>
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
          </div>
        ) : (
          <div>
            <div>로그인됨</div>
            <button className="logoutBtn" onClick={clickLogout}>
              로그아웃
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Login;
