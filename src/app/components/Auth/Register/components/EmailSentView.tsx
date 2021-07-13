import { Box, Center, Image, Stack, Text } from "@chakra-ui/react";

const EmailSentView = () => {
  return (
    <Box p={2}>
      <Center>
        <Box>
          <Stack>
            <Center>
              <Image h={56} src={"/assets/thanks.gif"} />
            </Center>
            <Center>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                Thanks for registering 😻
              </Text>
            </Center>
            <Center>
              <Text fontWeight={"bold"} fontSize={"md"}>
                Kindly open your email and verify your account 😸
              </Text>
            </Center>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
};

export default EmailSentView;
