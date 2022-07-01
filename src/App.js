import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Post from "./post/Post";
import PostView from "./post/PostView";
import NFTMint from "./web3/routes/NFTMint";
import NFTList from "./web3/routes/NFTList";
import NFTSell from "./web3/routes/NFTSell";
import Wallet from "./pages/Wallet";
import Nav from "./components/Nav";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import React, { useState } from "react";
import swal from "sweetalert";
// import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");

  // const web3 = new Web3(window.ethereum);
  const Connect = async () => {
    try {
      // try 문 안의 코드가 쭉 실행되고 에러가 없다면 catch는 건너뛴다
      if (window.ethereum) {
        // if 👉 메타마스크가 설치되어있으면 실행된다
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        }); // 연결된 메타마스크의 주소가 나온다
        // 👉 window.ethereum.request 을 console.log에 찍어보면 확인할수 있다

        setAccount(accounts[0]);

        // 연결된 메타마스크의 주소를 useState에 담는다
      } else {
        // 메타마스크가 설치되어있지 않다면 👉 alert 문구가 나온다
        alert("Install Metamask!");
      }
    } catch (error) {
      // 에러가 발생한다면 catch 실행
      console.error(error); // 👉 에러가 발생했다고 출력
    }
    swal({
      title: "Wallet Connected!",
      icon: "success",
    });
  };

  return (
    <>
      <Router>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/minting" element={<NFTMint account={account} />} />
          <Route
            path="/minting/nftlist"
            element={<NFTList account={account} />}
          />
          <Route
            path="/minting/nftsell"
            element={<NFTSell account={account} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/wallet"
            element={<Wallet account={account} onClickConnect={Connect} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/postview/:id" element={<PostView />} />
          {/* 제목을 클릭했을때 json 그에 맞는 id값을 찾아 들어감  */}
          <Route
            path="/signup"
            element={<SignUp account={account} onClickConnect={Connect} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
