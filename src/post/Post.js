import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlineStop } from "react-icons/ai";

function Post() {
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
              type="text"
              placeholder="write title"
            />
          </div>
          <textarea
            className="post_message"
            placeholder="write content"
          ></textarea>
        </div>
      </div>
      <div className="post_btn_wrap">
        <div className="post_btn_item">
          <div className="post_write_btn">
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
