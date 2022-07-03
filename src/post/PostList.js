import React from "react";
import "./PostList.css";
import { Link } from "react-router-dom";

function PostList({ id, title, writer, created_at, views, nickName }) {
  return (
    <div className="postlist_wrap">
      <div className="postlist_title"></div>
      <div>
        <div className="postlist_list">
          <div>
            <div className="postlist_num">{id}</div>
            <div className="postlist_title">
              <Link to={`/postview/${id}`}>
                <div className="postlist_title_name">{title}</div>
              </Link>
            </div>
            <div className="postlist_writer">{nickName}</div>
            <div className="postlist_date">{created_at}</div>
            <div className="postlist_count">{views}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
