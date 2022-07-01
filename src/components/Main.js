import React, { useState, useEffect } from "react";
import PostList from "../post/PostList";
import Pagination from "../post/Pagination";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./Main.css";

function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsViewPage] = useState(5);
  const [resp, setResp] = useState([]);

  const ary = [];

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
            ary.push(result);
            //console.log(result);
            setResp(result);
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    postData();
  }, []);

  const pageIndex = currentPage * postsViewPage;
  // 한 페이지에 몇개의 게시물 = 현재 페이지 x 게시물 5개
  const pageIndexFirst = pageIndex - postsViewPage;
  // 게시물들이 담긴 압축한곳 숫자표시 = 현재 페이지 x 게시물 5개 - 게시물 5개
  const indexPosts = (post) => {
    let indexPosts = 0;
    indexPosts = post.slice(pageIndexFirst, pageIndex);
    // json 데이터가 담긴 걸 slice 한다
    // 5개씩 하나의 공간에 담아서 총 표시
    return indexPosts;
  };

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
          <div className="board_top">
            <div className="board_num">No.</div>
            <div className="board_title">Title</div>
            <div className="board_writer">Writer</div>
            <div className="board_date">Date</div>
            <div className="board_count">Views</div>
          </div>
          <div>
            {indexPosts(resp).map((list) => (
              <PostList
                key={list.id}
                id={list.id}
                title={list.title}
                writer={list.writer}
                createdAt={list.created_at.slice(0, 10)}
              />
            ))}
          </div>
        </div>
        <Pagination
          postsViewPage={postsViewPage}
          totalPosts={resp.length}
          paginate={setCurrentPage}
        />
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
