import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useWallet, useWeb3 } from "hooks";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface NftCardProps {
  treeData: any;
  tokenId: any;
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

const NftCard: FC<NftCardProps> = ({ treeData, tokenId }) => {
  const [metadata, setMetadata] = useState<IMetadata>();
  const { mintContract, berryContract } = useWeb3();
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

  const bearBerry = async () => {
    try {
      const response = await berryContract.methods
        .bearBerry(tokenId)
        .send({ from: account });
      // setBerry(response);
      console.log(response);
      if (response.status) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const levelUp = async () => {
    try {
      const response = await mintContract.methods
        .levelUp(tokenId)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

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
      <Text my={4}>NFT ID : {tokenId}</Text>
      <Text mt={2} fontSize="2xl" fontWeight="bold">
        {metadata?.name}
      </Text>
      <Text>{metadata?.description}</Text>
      <Link
        href={`my-nft/detail/${treeData.shape}/${treeData.color}/${treeData.level}`}
      ></Link>
      <Flex justifyContent={"space-evenly"}>
        <Button onClick={bearBerry} my={4}>
          수확
        </Button>
        <Button onClick={levelUp} my={4}>
          LvL UP
        </Button>
      </Flex>
    </Box>
  );
};

export default NftCard;
