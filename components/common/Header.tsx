import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useWallet } from "hooks";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineWallet } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";

const scrollLink = [
  { id: "story", name: "세계관" },
  { id: "roadmap", name: "로드맵" },
  { id: "team", name: "팀" },
];

const Header: FC = () => {
  const { account, getAccount } = useWallet();

  const onClickWallet = () => {
    getAccount();
  };

  return (
    <Flex
      pos={"fixed"}
      w={"full"}
      top={0}
      bgColor="gray.100"
      px={8}
      py={2}
      shadow={"md"}
      justifyContent={"space-between"}
      alignContent={"center"}
    >
      <Box display={"flex"} alignSelf={"center"}>
        <Link href={"/"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            PROJECT TMI TREE
          </Text>
        </Link>
      </Box>
      <Box>
        {scrollLink.map((v, i) => {
          return (
            <ScrollLink key={i} to={v.id} spy={true} smooth={true}>
              <Button mx={12} variant="ghost" fontWeight="bold">
                {v.name}
              </Button>
            </ScrollLink>
          );
        })}
      </Box>
      <Box>
        {account ? (
          <Popover>
            <PopoverTrigger>
              <Button>
                <AiOutlineWallet size={28} />
                <Text ml={2} fontSize={"xs"}>
                  {account.substring(0, 6)}...
                  {account.substring(account.length - 4)}
                </Text>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody cursor={"pointer"} fontSize="md">
                <Link href={"/my-nft"}>내 NFT보기</Link>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Button onClick={onClickWallet}>
            <AiOutlineWallet size={28} />
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
