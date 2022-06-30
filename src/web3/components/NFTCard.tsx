import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./NFTCard.css";

interface NFTCardProps {
  animalType: string;
}

const NFTCard: FC<NFTCardProps> = ({ animalType }) => {
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
          <Link to="nftlist">
            <div className="nft_list_btn">NFT List</div>
          </Link>
          <Link to="nftsell">
            <div className="nft_sell_btn">NFT Sell</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NFTCard;
