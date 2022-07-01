import React from "react";
import "./PostList.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PostList({ id, title, writer, createdAt }) {
  let navigate = useNavigate();
  const boardOneClick = async () => {
    //해당 게시물 클릭시 postView페이지로 이동
    // console.log({ id });
    const sendId = { id };
    const url = "http://localhost:3001/postView";

    axios
      .post(url, sendId)
      .then((res) => console.log(res.data)) //게시판 1개데이터 가져옴
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <div className="postlist_wrap">
      <div className="postlist_title"></div>
      <div>
        <div className="postlist_list">
          <div>
            <div className="postlist_num">{id}</div>
            <div className="postlist_title">
              {/* <Link to={`/postview/${id}`}> */}
              <div className="postlist_title_name" onClick={boardOneClick}>
                {title}
              </div>
              {/* </Link> */}
            </div>
            <div className="postlist_writer">{writer}</div>
            <div className="postlist_date">{createdAt}</div>
            <div className="postlist_count">123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
