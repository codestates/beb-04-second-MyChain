import React, { useState, useEffect } from "react";
import "./Main.css";
import axios from "axios";
import PostList from "../post/PostList";
import Pagination from "../post/Pagination";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

function Main() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsViewPage] = useState(5);
  // 한 페이지에 몇개의 게시물을 보여줄지 설정 👉 5개

  useEffect(() => {
    const postData = async () => {
      const res = await axios.get(
        "https://gateway.pinata.cloud/ipfs/QmbTrmBRSrpySZMMKW99MP6yaN9Mf5btKWUDgP4FTTN19j"
      ); // 백엔드에서 게시물 작성한 json 데이터 get 요청
      setPosts(res.data);
      // 불러온 json 데이터를 useState에 담는다
      console.log(posts);
    };
    postData();
  }, []);

  const pageIndex = currentPage * postsViewPage;
  // 한 페이지에 몇개의 게시물 = 현재 페이지 x 게시물 5개
  const pageIndexFirst = pageIndex - postsViewPage;
  // 게시물들이 담긴 압축한곳 숫자표시 = 현재 페이지 x 게시물 5개 - 게시물 5개
  const indexPosts = (posts) => {
    let indexPosts = 0;
    indexPosts = posts.slice(pageIndexFirst, pageIndex);
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
            {indexPosts(posts).map((list) => (
              <PostList
                key={list.id}
                id={list.id}
                title={list.title}
                writer={list.writer}
                createdAt={list.createdAt}
              />
            ))}
          </div>
        </div>
        <Pagination
          postsViewPage={postsViewPage}
          totalPosts={posts.length}
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
