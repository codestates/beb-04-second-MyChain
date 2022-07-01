import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlineStop } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Post() {
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
          }
        })
        .then(() => {
          swal({
            title: "Writing Success!",
            text: "Get Rewards!",
            icon: "success",
            buttons: {
              confirm: {
                className: "btn btn-success",
              },
            },
          }).then((rewards) => {
            if (rewards) {
              swal({
                title: "Get Coin!",
                text: "My Balance : ",
                type: "success",
                buttons: {
                  confirm: {
                    className: "btn btn-success",
                  },
                },
              });
            }
          });
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
            <AiFillEdit /> Writing
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
