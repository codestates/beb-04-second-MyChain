import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import "./Nav.css";

function Nav() {
  return (
    <div className="navWrapper">
      <Link to="/">
        <div className="logoContainer">
          <img
            src="https://gateway.pinata.cloud/ipfs/Qmb1motiDbdfa6hPwctHSn8dz9RvhCEyC3KKjUTEzaaDBf"
            width="60"
            height="60"
            alt=""
          />

          <div className="logoText">DAO MyChain</div>
        </div>
      </Link>
      <div className="searchBar">
        <div className="searchIcon">
          <AiOutlineSearch />
          {/* 👆 검색창 아이콘 적용 👉 npm install react-icons 설치 */}
        </div>
        <input className="searchInput" placeholder="Search" />
      </div>
      <div className="headerItems">
        <Link to="/minting">
          <div className="tradeBtn">NFT-Zone</div>
        </Link>

        <Link to="/profile">
          <div className="profileIcon">
            <CgProfile />
          </div>
        </Link>

        <Link to="/wallet">
          <div className="walletIcon">
            <MdOutlineAccountBalanceWallet />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
