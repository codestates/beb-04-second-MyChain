import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlineStop } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

function Post() {
  // const [cookies, setCookie, removeCookie] = useCookies();
  let navigate = useNavigate();
  const cookieToWriter = document.cookie.slice(3).replace("%40", "@");
  const [boardForm, boardSignForm] = useState({
    title: "",
    content: "",
    writer: cookieToWriter,
  });
  const onChange = (e) => {
    boardSignForm({
      ...boardForm,
      [e.target.name]: e.target.value,
    });
  };

  const clickWriting = async () => {
    //게시판 글쓰기 클릭이벤트

    //console.log(" cookieToWriter = " + cookieToWriter);
    try {
      fetch("http://localhost:3001/boardWriting", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ boardForm }),
      })
        .then((response) => {
          if (response.status >= 200 && response.status <= 204) {
            alert("글쓰기 성공");
          }
        })
        .then(() => {
          navigate("/");
        });
      //.then((res) => res.json().then((msg) => setResp(msg["message"])));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post_wrap">
      <div className="post_title">
        <span className="post_title_notice">DAO MyChain Community</span>
        <p className="post_title_detail">
          Activate your community to receive rewards!
        </p>
      </div>
      <div className="post_write_wrap">
        <div className="post_write_content">
          <div className="post_title">
            <input
              className="post_input_title"
              name="title"
              type="text"
              placeholder="write title"
              onChange={onChange}
            />
          </div>
          <textarea
            className="post_message"
            name="content"
            placeholder="write content"
            onChange={onChange}
          ></textarea>
        </div>
      </div>
      <div className="post_btn_wrap">
        <div className="post_btn_item">
          <div className="post_write_btn" onClick={clickWriting}>
            <AiFillEdit />
            Writing
          </div>
          <Link to="/">
            <div className="post_cancel">
              Cancel <AiOutlineStop />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
