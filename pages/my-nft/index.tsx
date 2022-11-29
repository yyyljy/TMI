import { Flex, Grid, Text } from "@chakra-ui/react";
import NftCard from "@components/common/myNft/NftCard";
import { useWallet, useWeb3 } from "hooks";
import { NextPage } from "next";
import { useState, useEffect } from "react";

const MyNft: NextPage = () => {
  const [nftTokenIds, setNftTokenIds] = useState<any>();

  const { account, getAccount } = useWallet();
  const { mintContract } = useWeb3();

  const getMyNft = async () => {
    try {
      const response = await mintContract.methods.getTreeData(account).call();

      setNftTokenIds(response);
      const tokenIdArr = response[0];
      const treeDataArr = response[1];
      console.log(tokenIdArr);
      console.log(response[1]);
      for (let index = 0; index < treeDataArr.length; index++) {
        treeDataArr[index] = {
          ...treeDataArr[index],
          tokenId: tokenIdArr[index],
        };
      }
      console.log(treeDataArr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account || !mintContract) return;

    getMyNft();
  }, [account, mintContract]);

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Flex
      minH="100vh"
      justifyContent={"center"}
      alignItems={"center"}
      pt={24}
      flexDir="column"
    >
      <Text mb={8} fontSize={"4xl"}>
        내 NFT
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {nftTokenIds &&
          nftTokenIds[Object?.keys(nftTokenIds)[1]].map((v, i) => {
            return <NftCard key={i} treeData={v} />;
          })}
      </Grid>
    </Flex>
  );
};

export default MyNft;
