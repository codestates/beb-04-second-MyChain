import { Button, Grid, Text, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SaleCardButton from "./NFT-SellButton";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
} from "../contracts/web3";

const MyAnimal = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState([]);
  // 👉 SaleCardButton.tsx에서 interface로 정의된 타입을 import해옴
  const [saleStatus, setSaleStatus] = useState(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength2 = await mintAnimalTokenContract.methods
        // 스마트컨트랙트 배포후에 나오는 함수
        .balanceOf(account) // NFT 가지고 있는 갯수 조회 (인자에는 주소를 넣어야한다)
        .call(); // 함수 부르기

      if (balanceLength2 === 0) return;
      // NFT 가 0 일 경우 실행 하지마라

      const tempAnimalCardArray = [];
      // SaleCardButton.tsx에서 정의한 타입의 빈배열

      const response = await mintAnimalTokenContract.methods
        // 스마트컨트랙트 배포후에 나오는 함수
        .apiAnimalToken(account)
        // 👇👇👇 밑에 주석처리된 부분을 MintAnimalToken.sol 에서 다 담은 함수
        .call();

      response.map((value) => {
        // apiAnimalToken 함수로 부터 나오는 value값을 map해온다
        return tempAnimalCardArray.push({
          animalTokenId: value.animalTokenId,
          animalType: value.animalType,
          animalPrice: value.animalPrice,
        });
      });
      // tempAnimalCardArray배열에 push

      console.log(tempAnimalCardArray);

      setAnimalCardArray(tempAnimalCardArray);
      // 버튼을 눌러서 my-animal 링크로 들어가면 👉 어떤 NFT들이 뽑혔는지 NFT 이미지배열을 출력해주는 useState
    } catch (error) {
      console.error(error);
    }
  };

  const getApprovedForAllCall = async () => {
    // onwer가 특정계정에게 자신의 모든 NFT에 대한 사용을 허용했는지 여부를 확인하는 변수
    try {
      const res = await mintAnimalTokenContract.methods
        // 스마트컨트랙트 배포후에 나오는 함수
        .isApprovedForAll(account, saleAnimalTokenAddress)
        // ERC-721 내장함수 - isApprovedForAll 👉 onwer가 특정계정에게 자신의 모든 NFT에 대한 사용을 허용했는지 여부를 반환
        // 판매권한을 줬는지 확인
        .call(); // 함수 부르기

      if (res === true) {
        // res 변수가 true 일경우는
        setSaleStatus(res);
        // useState 기본값은 false 이나 res를 담아줌으로써 true로 자동 변경
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return; // 계정이 없는경우는 그냥 리턴

      const res = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        // 인자는 판매자의 주소와, true & false 의 상태
        // !saleStatus이면 기본값이 false니까 그 반대인 true 라는 뜻이다
        // 👉 즉, 판매자에게 true (허용) 해주라는 뜻이다
        // ERC-721 내장함수 - setApprovalForAll 👉 특정계정에게 자신이 소유한 모든 NFT에 대한 사용을 허용해주는 함수
        // false를 👉 true 로 허용해준다
        .send({ from: account }); // account 으로부터 함수 보내주기

      if (res.status) {
        // res 의 상태가 true 이거나 false 이면
        setSaleStatus(!saleStatus);
        // set useState안에 useState를 넣음으로써
        // 버튼을 클릭할때마다 true <ㅡ> false 계속 변경된다
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;
    // 맨처음 useEffect가 실행되면 account는 없기때문에 에러가 뜰것이다
    // 그래서 if 문을 하나 생성해야한다
    // 👉 account가 없을경우는 그냥 리턴

    getApprovedForAllCall();
    getAnimalTokens();
  }, [account]);

  return (
    <React.Fragment>
      <Flex alignItems="center">
        <Text display="inline-block">
          Sale Status : {saleStatus ? "True" : "False"}
          {/* 3항연산자 👉 useState 값이 참이면 "True" 거짓이면 "False"를 출력*/}
        </Text>
        <Button
          size="xs"
          marginLeft="2"
          colorScheme={saleStatus ? "red" : "blue"}
          onClick={onClickApproveToggle}
        >
          {/* 센터자리에 Text와 버튼을 한줄로 만들고 버튼색상 적용 */}
          {saleStatus ? "Cancel" : "Approve"}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(10, 1fr)" gap={5} marginTop={4}>
        {/* Grid(격자) 한줄에 10개씩 배열, 갭은 5로 준다 */}
        {/* ⭐ animalCardArray는 NFT가 담겨있는 배열이다 
      animalCardArray가 있다면 map을 한다 
      ⭐ map 함수는 배열 안에서 원하는 것만 빼내서 출력이 가능하다.*/}
        {animalCardArray &&
          animalCardArray.map((value, index) => {
            // map 👉 어떤 NFT (value) , 몇번째 (index)
            return (
              <SaleCardButton
                key={index}
                animalTokenId={value.animalTokenId}
                animalType={value.animalType}
                animalPrice={value.animalPrice}
                saleStatus={saleStatus}
                account={account}
                // 👆 SaleCardButton.tsx 에서 가져온 Props 로 가져온 인자들 = 위에 정의된 변수
              />
            );
            // 👉 value : 배열 내 현재 값 (string)
            // 👉 index : 배열 내 현재 값의 인덱스 (순번)
          })}
      </Grid>
    </React.Fragment>
  );
};

export default MyAnimal;
