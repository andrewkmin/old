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
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import _axios from "../api/_axios";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import _DataContext from "../data/data.context";
import _AuthContext from "../auth/auth.context";
import { MdEmail, MdLock } from "react-icons/md";

const Settings = () => {
  const Toast = useToast();
  const { toggleColorMode } = useColorMode();
  const DataContext = useContext(_DataContext);
  const AuthContext = useContext(_AuthContext);

  const {
    isOpen: deleteAccountAlertIsOpen,
    onOpen: deleteAccountAlertOnOpen,
    onClose: deleteAccountAlertOnClose,
  } = useDisclosure();

  const FormActions = {
    async deleteAccount() {
      const { data } = await _axios.delete("/api/accounts/delete");
      if (!data.error) {
        Toast({
          title: "Deleted",
          description: "All of your account data has been deleted",
          duration: 5000,
          isClosable: true,
          status: "success",
        });
        AuthContext.setAuthenticated(false);
        DataContext.setUserData({});
        <Redirect to="/logout" />;
      } else {
        Toast({
          title: data.error,
          duration: 5000,
          isClosable: true,
          status: "error",
        });
      }
    },

    handleInput() {},
    checkForChanges() {},
  };

  return (
    <>
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
                    <Avatar
                      src={DataContext.userData.pictureUrl}
                      name={DataContext.userData.fullName}
                    />
                    <Center>
                      <Text ms={2} fontWeight="bold">
                        {DataContext.userData.fullName}
                      </Text>
                    </Center>
                  </Flex>
                </Box>
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Account
                </Text>

                <Box mt={2}>
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
                </Box>
              </Box>

              {/* Privacy Settings */}
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  Privacy
                </Text>

                <RadioGroup
                  name="privacy"
                  defaultValue={
                    DataContext.userData.isPrivate ? "private" : "public"
                  }
                  mt={2}
                >
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
                      isChecked={useColorModeValue(false, true)}
                      onChange={toggleColorMode}
                    />
                    {useColorModeValue("🌞", "🌚")}
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
              onClick={() => FormActions.deleteAccount()}
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
