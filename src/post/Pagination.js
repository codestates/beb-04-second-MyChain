import React from "react";
import "./Pagination.css";
import {
  AiOutlineVerticalRight,
  AiOutlineVerticalLeft,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Pagination = ({ postsViewPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsViewPage); i++) {
    // json의 length 나누기 / 한 페이지에 표시되는 게시물(5개) 👉 반올림
    pageNumbers.push(i);
  }
  return (
    <div className="board_page">
      <a href="#!" className="arrow_icon">
        <AiOutlineVerticalRight />
      </a>
      <a href="#!" className="arrow_icon">
        <AiOutlineLeft />
      </a>
      {pageNumbers.map((number) => (
        <a
          href="#!"
          className="num"
          key={number}
          onClick={() => paginate(number)}
        >
          {number}
        </a>
      ))}
      <a href="#!" className="arrow_icon">
        <AiOutlineRight />
      </a>
      <a href="#!" className="arrow_icon">
        <AiOutlineVerticalLeft />
      </a>
    </div>
  );
};

export default Pagination;
