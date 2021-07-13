import { chakra, Divider, Stack } from "@chakra-ui/react";

// Nice "OR" divider
const OrDivider = () => (
  <Stack direction={"row"} alignItems={"center"}>
    <Divider />
    <chakra.span fontWeight={"semibold"} color={"gray.500"}>
      OR
    </chakra.span>
    <Divider />
  </Stack>
);

export default OrDivider;
