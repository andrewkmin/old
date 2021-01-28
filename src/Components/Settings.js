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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLock } from "react-icons/md";

import _axios from "../helpers/_axios";

const Settings = () => {
  const Toast = useToast();
  const [currentConfig, setCurrentConfig] = useState({});
  const [updatedConfig, setUpdatedConfig] = useState({});

  const checkForChanges = () => {
    if (currentConfig === updatedConfig) {
      if (Toast.isActive("settings-changed")) {
        Toast.close("settings-changed");
      }
    } else {
      if (!Toast.isActive("settings-changed")) {
        Toast({
          id: "settings-changed",
          title: "You have unsaved changes",
          status: "warning",
          duration: null,
          isClosable: false,
        });
      }
    }
  };

  // TODO: Fix the infinite API call bug when using useEffect to set values
  const fetchSettings = async () => {
    const { data } = await _axios.get("/api/accounts/fetch");
    setCurrentConfig(data);
    setUpdatedConfig(currentConfig);
  };

  return (
    <>
      <Helmet>
        <title>Settings — Usocial</title>
      </Helmet>
      <Box m={2}>
        <Container border="1px" borderRadius={10} borderColor="gray.300" p={5}>
          <Text fontSize="3xl" fontWeight="bold">
            Settings
          </Text>
          <Divider />
          <Box mt={5}>
            {/* Profile Settings */}
            <Stack spacing={5}>
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
                        placeholder={currentConfig.firstName}
                        onChange={(event) => {
                          if (event.currentTarget.value.length === 0) {
                            updatedConfig.firstName = currentConfig.firstName;
                          } else {
                            updatedConfig.firstName = event.currentTarget.value;
                          }
                          checkForChanges();
                        }}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Input
                        ms={1}
                        name="lastName"
                        placeholder={currentConfig.lastName}
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
                          placeholder={currentConfig.email}
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
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Settings;
