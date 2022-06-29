import React from "react";
import "./Wallet.css";

function Wallet({ account, onClickConnect, onClickDisConnect }) {
  return (
    <div className="walletConnectWrapper">
      {/* 3항 연산자를 이용 */}
      {/* account 가 있으면 (지갑연결이 되어있으면) disConnect 버튼이 나오고 */}
      {/* account 가 없으면 지갑 연결하라는 버튼이 나온다 */}
      {account ? (
        <div>
          <div className="disconnectButton" onClick={onClickDisConnect}>
            disConnect Wallet
          </div>
        </div>
      ) : (
        <div>
          <div className="connectButton" onClick={onClickConnect}>
            Connect Wallet
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
