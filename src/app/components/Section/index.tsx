import { ReactChildren } from "react";
import { Box, ChakraProps, Stack, Text } from "@chakra-ui/react";

type SectionProps = {
  title: string;
  subtitle: string;
  children: ReactChildren;
};

interface SectionInterface extends ChakraProps, SectionProps {}

// A responsive settings section
const Section = ({ title, subtitle, children }: SectionInterface) => {
  return (
    <Box px={["5", 10, null, "60", "96"]}>
      <Stack spacing={5}>
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} fontWeight={"semibold"}>
            {title}
          </Text>
          <Text color={"gray.500"} fontSize={["sm", "md"]}>
            {subtitle}
          </Text>
        </Box>

        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};

export default Section;
