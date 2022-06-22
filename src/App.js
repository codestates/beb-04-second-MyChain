import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Trade from "./pages/Trade";
import Wallet from "./pages/Wallet";
import Nav from "./components/Nav";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import ContentsView from "./pages/ContentsView";
import WriteContents from './pages/writeContents';
import Forum from './pages/forum'

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
          <Route exact path='/contentsview' element={<ContentsView />} />
          <Route exact path='/writeContents' element={<WriteContents />} />
          <Route exact path="/forum" element={<Forum />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
