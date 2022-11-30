import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FC, useState } from "react";

// PLN width, height 사이즈 수정
const width = 512;
const height = 512;

// PLN image - public/images 교체, contents - 세계관에 관한 내용 추가
const StoryContents = [
  {
    image: "images/story1.jpg",
    contents: "친환경 활동을 하나씩 실천해나갈 때마다",
  },
  {
    image: "images/2.png",
    contents: "TMI의 형형색색 나무 NFT를 구매할 수 있는 권리를 갖고",
  },
  {
    image: "images/3.png",
    contents: "탐스러운 열매를 수확하며 나무를 키워보세요."
  }
];

const Story: FC = () => {
  const [page, setPage] = useState<number>(0);

  const onClickPage = (_page: number) => () => {
    setPage(_page);
  };
  const onClickPrev = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      setPage(StoryContents.length - 1);
    }
  };
  const onClickNext = () => {
    if (page < StoryContents.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  };

  return (
    <Flex
      id="story"
      minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text mb={8} fontWeight="bold" fontSize="4xl">
        STORY
      </Text>
      <Flex mb={4}>
        {StoryContents.map((_, i) => {
          return (
            <Box
              key={i}
              mx={1}
              w={4}
              h={4}
              rounded="full"
              bgColor={i === page ? "gray.300" : "gray.100"}
              onClick={onClickPage(i)}
              cursor="pointer"
            ></Box>
          );
        })}
      </Flex>
      <Flex alignItems="center">
        <Text onClick={onClickPrev} mr={12} fontSize="6xl" cursor="pointer">
          ←
        </Text>
        <Flex width={width} minH={height} overflow="hidden">
          {StoryContents.map((v, i) => {
            return (
              <Box
                key={i}
                width={width}
                flex="none"
                ml={i === 0 ? `-${page}00%` : ""}
                style={{ transition: "all 0.3s ease-out" }}
              >
                <Image src={v.image} alt="Story" />
                {i === page && (
                  <Text
                    align={"center"}
                    fontSize="xl"
                    w={width}
                    fontWeight={"bold"}
                  >
                    {v.contents}
                  </Text>
                )}
              </Box>
            );
          })}
        </Flex>
        <Text onClick={onClickNext} ml={12} fontSize="6xl" cursor="pointer">
          →
        </Text>
      </Flex>
    </Flex>
  );
};

export default Story;
