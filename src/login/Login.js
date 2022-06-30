import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Login.css";

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
    if (cookies.id !== undefined) {
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
          setCookie("id", response.data.id);
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
      });
  };
  return (
    <div className="login_Wrapper">
      <div className="login_Items">
        {isLogin === false ? (
          <div className="login_Form">
            <div>
              <input
                className="login_Input"
                type="text"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                className="login_Input"
                type="password"
                name="pwd"
                placeholder="Password"
                onChange={onChange}
              />
            </div>
            <div className="login_btn_wrap">
              <div className="login_btn_item">
                <div>
                  <div className="login_btn" onClick={clickLogin}>
                    Login
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="logout_btn" onClick={clickLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
