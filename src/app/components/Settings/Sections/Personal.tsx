import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import Section from "../components/Section";
import { useContext, useRef } from "react";
import DataContext from "../../../data/data.context";

const Personal = () => {
  const formRef = useRef(null);
  const { userData } = useContext(DataContext);

  return (
    <Section title={"Personal Info"}>
      <form ref={formRef}>
        <Stack spacing={3}>
          <Box mt={2}>
            <Stack direction={"row"}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder={userData?.first_name}
                  defaultValue={userData?.first_name}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder={userData?.last_name}
                  defaultValue={userData?.last_name}
                />
              </FormControl>
            </Stack>
          </Box>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              disabled
              isDisabled
              placeholder={userData?.email}
              defaultValue={userData?.email}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              autoCorrect={"off"}
              autoComplete={"off"}
              autoCapitalize={"off"}
              placeholder={userData?.bio!!}
              defaultValue={userData?.bio!!}
            />
          </FormControl>

          <Box>
            <Stack
              alignItems={"center"}
              justifyContent={"end"}
              direction={["column", "row"]}
            >
              <Button isDisabled variant={"ghost"} colorScheme={"teal"}>
                Save
              </Button>
              <Button isDisabled variant={"ghost"} colorScheme={"red"}>
                Discard
              </Button>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Section>
  );
};

export default Personal;
