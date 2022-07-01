import React, { FC } from "react";
import swal from "sweetalert";
import "./NFTCard.css";

interface NFTCardProps {
  animalType: string;
}

const NFTCard: FC<NFTCardProps> = ({ animalType }) => {
  const waitList = async () => {
    swal("서비스 준비 중입니다 !", {
      icon: "warning",
      buttons: {
        confirm: {
          className: "btn btn-warning",
        },
      },
    });
  };
  return (
    <>
      <div>
        <img
          className="nft_view_img"
          src={`images/${animalType}.png`}
          alt="AnimalCard"
        />
      </div>
      <div className="post_view_title">MyChain NFT #{animalType}</div>
      <br />
      <div className="nft_btn_wrap">
        <div className="nft_btn_item">
          <div className="nft_list_btn" onClick={waitList}>
            NFT List
          </div>
          <div className="nft_sell_btn" onClick={waitList}>
            NFT Sell
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTCard;
