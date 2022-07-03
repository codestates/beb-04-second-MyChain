import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostView.css";
import { AiFillEdit, AiOutlineStop } from "react-icons/ai";

function PostView() {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  // 페이징 처리를 위한 useParams
  // 게시물을 누르면 해당 id 의 게시물이 나오게

  useEffect(() => {
    const postData = async () => {
      try {
        fetch("http://localhost:3001/selectBoard", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(),
        }).then((res) =>
          res.json().then((result) => {
            setPosts(result);
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    postData();
  }, []);

  const postId = posts.filter((list) => list.id === Number(id));
  // json 데이터를 useState에 담고 그걸 filter해서 id값을 찾아서 숫자화 시킴

  return (
    <div className="postview_wrap">
      <div className="postview_title">
        <span className="postview_title_notice">DAO MyChain Community</span>
        <p className="postview_title_detail">
          Activate your community to receive rewards!
        </p>
      </div>
      <div className="postview_view_wrap">
        <div className="postview_view_content">
          {postId.map((cont) => (
            <div key={cont.id}>
              <div className="post_view_title">{cont.title}</div>
              <div className="post_view_title_flex">
                <div className="post_view_writer">{cont.writer}</div>
                <div className="post_view_date">
                  {cont.created_at.slice(0, 19)}
                </div>
              </div>
              <br />
              <hr />
              <div className="postview_content">{cont.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="postview_btn_wrap">
        <div className="postview_btn_item">
          <div className="postview_view_btn">
            <AiFillEdit /> Editing
          </div>
          <div className="postview_cancel">
            Remove <AiOutlineStop />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostView;
