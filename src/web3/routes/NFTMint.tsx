import React, { FC, useState } from "react";
import { mintAnimalTokenContract } from "../contracts/web3";
import NFTCard from "../components/NFTCard";
import "./main.css";

interface MintingProps {
  account: string;
}

const NFTMint: FC<MintingProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>();

  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      if (response.status === true) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();

        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypess(animalTokenId)
          .call();

        setNewAnimalType(animalType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="nft_mint_wrap">
      {newAnimalType ? (
        <NFTCard animalType={newAnimalType} />
      ) : (
        <div>
          <div className="nft_mint_wraptext">Mint Random NFT</div>
          <button className="nft_mint_btn" onClick={onClickMint}>
            M I N T
          </button>
          <div className="nft_mint_gif"></div>
        </div>
      )}
    </div>
  );
};

export default NFTMint;
