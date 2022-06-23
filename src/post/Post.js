import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

function Post() {
  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>커뮤니티</strong>
        <p>커뮤니티를 활성화하여 보상을 받아보세요!</p>
      </div>
      <div className="board_write_wrap">
        <div className="board_write">
          <div className="title">
            <dl>
              <dt>제목</dt>
              <dd>
                <input type="text" placeholder="제목 입력" />
              </dd>
            </dl>
          </div>
          <div className="info"></div>
          <div className="cont">
            <textarea placeholder="내용 입력"></textarea>
          </div>
        </div>
        <div className="bt_wrap">
          <a href="view.html" className="on">
            등록
          </a>
          <Link to="/">
            <div>취소</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
