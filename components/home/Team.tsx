import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import TeamCard, { TeamCardProps } from "./TeamCard";

// PLN 팀원 정보 교체
const teamCardContents: TeamCardProps[] = [
  {
    name: "이정윤",
    position: "팀장, 프로그래머",
    image: "images/team1.png",
  },
  {
    name: "임형준",
    position: "디자이너, 프로그래머",
    image: "images/team2.png",
  },
  {
    name: "이유경",
    position: "기획, 프로그래머",
    image: "images/team3.png",
  },
];

const Team: FC = () => {
  return (
    <Flex
      id="team"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      pb={24}
      flexDir="column"
    >
      <Text mb={8} fontWeight="bold" fontSize="4xl">
        TEAM
      </Text>
      <Flex>
        {teamCardContents.map((v, i) => {
          return (
            <TeamCard
              key={i}
              name={v.name}
              position={v.position}
              image={v.image}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Team;
