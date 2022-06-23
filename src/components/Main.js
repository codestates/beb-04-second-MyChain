import React from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

function Main() {
  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong className="board_title_notice">DAO MyChain Community</strong>
        <p className="board_title_detail">
          Activate your community to receive rewards!
        </p>
      </div>
      <div>
        <div className="board_list">
          <div className="top">
            <div className="num">No.</div>
            <div className="title">Title</div>
            <div className="writer">Writer</div>
            <div className="date">Date</div>
            <div className="count">Views</div>
          </div>
          <div>
            <div className="num">5</div>
            <div className="title">
              <Link to="/postview">
                <div className="write_title">글 제목이 들어가는곳</div>
              </Link>
            </div>
            <div className="writer">김코딩</div>
            <div className="date">2022.02.22</div>
            <div className="count">33</div>
          </div>
        </div>
        <div className="board_page">
          <a href="#" className="bt first"></a>
          <a href="#" className="bt prev"></a>
          <a href="#" className="num on">
            1
          </a>
          <a href="#" className="num">
            2
          </a>
          <a href="#" className="num">
            3
          </a>
          <a href="#" className="num">
            4
          </a>
          <a href="#" className="num">
            5
          </a>
          <a href="#" className="bt next"></a>
          <a href="#" className="bt last"></a>
        </div>
        <div className="bt_wrap">
          <Link to="/post">
            <div className="board_write">
              <AiFillEdit /> Writing
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
