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
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLock } from "react-icons/md";

import _axios from "../utils/_axios";
import _DataContext from "../utils/data.context";
import _AuthContext from "../auth/auth.context";

const Settings = () => {
  const Toast = useToast();
  const DataContext = useContext(_DataContext);
  const AuthContext = useContext(_AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: deleteAccountAlertIsOpen,
    onOpen: deleteAccountAlertOnOpen,
    onClose: deleteAccountAlertOnClose,
  } = useDisclosure();

  const deleteAccount = async () => {
    const { data } = await _axios.delete("/api/accounts/delete");
    if (!data.error) {
      <Redirect to="/logout" />;
      DataContext.setUserData({});
      AuthContext.setAuthenticated(false);

      Toast({
        title: "Deleted",
        description: "All of your account data has been deleted",
        duration: 5000,
        isClosable: true,
        status: "success",
      });
    } else if (data.error) {
      Toast({
        title: data.error,
        duration: 5000,
        isClosable: true,
        status: "error",
      });
    }
  };

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

                <Box mt={1}>
                  <Text>
                    <Switch
                      me={2}
                      isChecked={colorMode === "light" ? false : true}
                      onChange={toggleColorMode}
                    />
                    {colorMode === "light" ? "🌞" : "🌚"}
                  </Text>
                </Box>
              </Box>

              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Danger Zone
                </Text>

                <Box mt={1}>
                  <Button
                    onClick={deleteAccountAlertOnOpen}
                    _focus={false}
                    w="full"
                    colorScheme="red"
                    size="sm"
                  >
                    Delete Your Account
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={deleteAccountAlertOnClose}
        isOpen={deleteAccountAlertIsOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete account?</AlertDialogHeader>
          <AlertDialogCloseButton _focus={false} />
          <AlertDialogBody>
            <Text fontWeight="semibold">
              Are you sure you want to delete your account and all of the
              information associated with it?
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Warning, this action is irreversible!
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button _focus={false} onClick={deleteAccountAlertOnClose}>
              No
            </Button>
            <Button
              onClick={() => deleteAccount()}
              _focus={false}
              colorScheme="red"
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Settings;
