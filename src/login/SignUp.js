import React from "react";
import "./SignUp.css";
import { useState, useEffect } from "react";
import { color } from "@chakra-ui/react";

function SignUp() {
  const [emailMessage, setEmailMessage] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");
  const [signForm, setSignForm] = useState({
    email: "",
    pwd: "",
    pwd_chk: "",
    nick_name: "",
  });
  // 이메일 유효성 검사
  const emailChk = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    const okFlag = regExp.test(e.target.value);
    console.log("이메일 유효성 검사 :: ", regExp.test(e.target.value));
    if (okFlag) {
      setEmailMessage("");
    } else {
      setEmailMessage("이메일 형식이 부적합합니다");
    }
  };
  //비밀번호 유효성 검사
  const pwdChk = (e) => {
    if (signForm.pwd != signForm.pwd_chk) {
      setPwdMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPwdMessage("");
    }
  };

  const clickSignUp = async () => {
    //가입진행
    if (emailMessage === "" && pwdMessage === "") {
      //유효성 검사 완료 시 진행
      try {
        fetch("http://localhost:3001/dd", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ signForm }),
        }).then((res) => {
          document.location.href = "/login";
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
    <div className="contain">
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
            onBlur={emailChk}
          />
        </div>
        {emailMessage !== "" && (
          <div style={{ color: "red" }}>{emailMessage}</div>
        )}
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
            onBlur={pwdChk}
          />
          <div style={{ color: "red" }}>{pwdMessage}</div>
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
