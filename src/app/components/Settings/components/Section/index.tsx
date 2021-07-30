import React from "react";
import { Box, Divider, Stack, Text, useColorModeValue } from "@chakra-ui/react";

type SectionProps = {
  title: string;
  subtitle?: string;
};

// A responsive settings section
const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => {
  return (
    <Box px={["5", 10, null, "60", "96"]}>
      <Stack spacing={5}>
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} fontWeight={"semibold"}>
            {title}
          </Text>
          <Text
            color={useColorModeValue("gray.600", "gray.300")}
            fontSize={["sm", "md"]}
          >
            {subtitle}
          </Text>
        </Box>
        <Box>{children}</Box>
        <Divider />
      </Stack>
    </Box>
  );
};

export default Section;
