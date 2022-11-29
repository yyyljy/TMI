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
      console.log(response);
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
        {nftTokenIds?.map((v, i) => {
          return <NftCard key={i} treeData={v} />;
        })}
      </Grid>
    </Flex>
  );
};

export default MyNft;
