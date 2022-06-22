import React from "react";
import "./Main.css";
import { AiFillEdit } from "react-icons/ai";

function Main() {
  return (
    <div className="main_Container">
      <div className="main_Wrapper">
        <div className="main_Profile">
          <AiFillEdit />
        </div>
        <div className="main_Input_Container">
          <div className="main_Input_Wrapper">
            <div className="main_Input">
              <input
                className="main_Input_Title"
                type="text"
                defaultValue=""
                placeholder="글제목"
              />
              <textarea
                className="main_Input-Message"
                defaultValue={""}
                placeholder="글내용"
              />
            </div>
            <div className="main_Posting">
              <button className="main_Posting_Btn">글쓰기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
