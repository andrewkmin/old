import {
  Box,
  Container,
  Text,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLock } from "react-icons/md";

import _DataContext from "../utils/data.context";

const Settings = () => {
  const Toast = useToast();
  const DataContext = useContext(_DataContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const checkForChanges = () => {
    // TODO: Show a toast if settings have been changed
  };

  return (
    <>
      <Helmet>
        <title>Settings — Usocial</title>
      </Helmet>
      <Box m={2}>
        <Container p={5}>
          <Text fontSize="3xl" fontWeight="bold">
            Settings
          </Text>
          <Divider />
          <Box mt={5}>
            {/* Profile Settings */}
            <Stack borderRadius="md" spacing={5} boxShadow="lg" p={5}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Profile
                </Text>

                <Box mt={1}>
                  <Flex>
                    <InputGroup>
                      <InputLeftElement>
                        <AiOutlineUser color="gray" />
                      </InputLeftElement>
                      <Input
                        me={1}
                        name="firstName"
                        placeholder={DataContext.userData.firstName}
                        onChange={(event) => {
                          // TODO:
                        }}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Input
                        ms={1}
                        name="lastName"
                        placeholder={DataContext.userData.lastName}
                        onChange={(event) => {
                          // TODO:
                        }}
                      />
                    </InputGroup>
                  </Flex>
                </Box>
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Account
                </Text>

                <Box mt={2}>
                  <form>
                    <Stack spacing={2}>
                      <InputGroup>
                        <InputLeftElement>
                          <MdEmail color="gray" />
                        </InputLeftElement>
                        <Input
                          required
                          name="email"
                          type="email"
                          placeholder={DataContext.userData.email}
                          onChange={(event) => {
                            // TODO:
                          }}
                        />
                      </InputGroup>

                      <InputGroup>
                        <InputLeftElement>
                          <MdLock color="gray" />
                        </InputLeftElement>
                        <Input
                          required
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </InputGroup>
                    </Stack>
                  </form>
                </Box>
              </Box>

              {/* Privacy Settings */}
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Privacy
                </Text>

                <RadioGroup name="privacy" mt={2}>
                  <Stack direction="row">
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                  </Stack>
                </RadioGroup>
              </Box>

              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Appearance
                </Text>

                <Box>
                  <Text>
                    Color Theme: {colorMode === "light" ? "🌞" : "🌚"}
                  </Text>
                  <Switch onChange={toggleColorMode} />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Settings;
