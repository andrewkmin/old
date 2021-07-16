import millify from "millify";
import {
  Box,
  Button,
  chakra,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Stats = () => {
  const data = {
    friends: 1000,
    followers: 1000,
  };

  return (
    <Box>
      <Stack fontSize={"xl"} direction={"row"}>
        <Button
          size={"lg"}
          border={"2px"}
          rounded={"full"}
          variant={"unstyled"}
          transition={"all 0.1s ease-in"}
          _hover={{
            transition: "all 0.1s ease-out",
            bgColor: useColorModeValue("gray.200", "gray.700"),
            borderColor: useColorModeValue("gray.200", "gray.700"),
          }}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Text p={2} fontSize={["sm", "md", "lg"]} userSelect={"none"}>
            <chakra.span fontFamily={"ubuntu bold"}>
              {millify(data.followers)}
            </chakra.span>{" "}
            followers
          </Text>
        </Button>

        {/* <chakra.button
          p={2}
          border={"2px"}
          rounded={"xl"}
          transition={"all 0.1s ease-in"}
          _hover={{
            transition: "all 0.1s ease-out",
            bgColor: useColorModeValue("gray.200", "gray.700"),
            borderColor: useColorModeValue("gray.200", "gray.700"),
          }}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Text fontSize={["sm", "md", "lg"]} userSelect={"none"}>
            <chakra.span fontFamily={"ubuntu bold"}>
              {millify(data.friends)}
            </chakra.span>{" "}
            friends
          </Text>
        </chakra.button> */}
      </Stack>
    </Box>
  );
};

export default Stats;
