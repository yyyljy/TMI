import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useWallet, useWeb3 } from "hooks";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface NftCardProps {
  treeData: any;
}

export interface IMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const NftCard: FC<NftCardProps> = ({ treeData }) => {
  const [metadata, setMetadata] = useState<IMetadata>();
  const { berryContract } = useWeb3();
  const { account, getAccount } = useWallet();
  const [berry, setBerry] = useState();

  const getMetadata = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/${treeData.shape}/${treeData.color}/${treeData.level}.json`
      );

      setMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getBerryBalance = async () => {
    try {
      const response = await berryContract.methods.balanceOf(account).call();

      setBerry(response);
    } catch (error) {
      console.error(error);
    }
  };

  const bearBerry = async () => {
    try {
      // const response
      // const response = await berryContract.methods.bearBerry(tokenId).call();

      // setBerry(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    if (!account || !berryContract) return;

    getBerryBalance();
  }, [account, berryContract]);

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Box w={300} bgColor="gray.50" shadow="md" rounded="2xl" p={4}>
      <Image
        src={metadata?.image}
        alt={metadata?.name}
        fallbackSrc="images/loading.png"
        rounded="2xl"
      />
      <Text mt={2} fontSize="2xl" fontWeight="bold">
        {metadata?.name}
      </Text>
      <Text>{metadata?.description}</Text>
      <Link
        href={`my-nft/detail/${treeData.shape}/${treeData.color}/${treeData.level}`}
      >
        <Text my={4}>보유 열매 수 : {berry}</Text>
      </Link>
      <Flex justifyContent={"space-evenly"}>
        <Link
          href={`my-nft/detail/${treeData.shape}/${treeData.color}/${treeData.level}`}
        >
          <Button my={4}>수확</Button>
        </Link>
        <Link
          href={`my-nft/detail/${treeData.shape}/${treeData.color}/${treeData.level}`}
        >
          <Button my={4}>LvL UP</Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default NftCard;
