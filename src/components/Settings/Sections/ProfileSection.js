import { RiCheckFill } from "react-icons/ri";
import { useContext, useState } from "react";
import { Box, Stack, Text, Input, Button, useToast } from "@chakra-ui/react";

import _axios from "../../../api/_axios";
import DataContext from "../../../data/data.context";

const ProfileSection = () => {
  const Toast = useToast();
  const { userData, setState } = useContext(DataContext);
  const [changed, setChanged] = useState({
    pass: false,
    email: false,
  });
  const [saving, setSaving] = useState(false);

  const saveChanges = async (event) => {
    setSaving(true);
    const payload = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    try {
      const { data: updateStatus } = await _axios.put(
        "/api/accounts/update/",
        payload
      );

      if (!updateStatus?.error) {
        const { data: updatedData } = await _axios.get("/api/accounts/fetch");
        setSaving(false);

        if (!updatedData?.error) {
          event.target.elements.email.value = "";
          event.target.elements.password.value = "";

          setChanged({
            email: false,
            pass: false,
          });
          setState({
            userData: updatedData,
          });
          return Toast({
            title: "Your changes have been saved",
            duration: 2000,
            isClosable: false,
            status: "success",
          });
        } else {
          return Toast({
            title: "There was an error",
            description: updateStatus?.error,
            duration: 2000,
            isClosable: false,
            status: "error",
          });
        }
      } else {
        setSaving(false);
        return Toast({
          title: "There was an error",
          description: updateStatus?.error,
          duration: 2000,
          isClosable: false,
          status: "error",
        });
      }
    } catch (error) {
      setSaving(false);
      console.log(error);
      return Toast({
        title: "There was an error",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Box>
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            Profile settings
          </Text>
        </Box>

        <Box>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              saveChanges(event);
            }}
          >
            <Stack spacing={3}>
              <Input
                isRequired
                name={"email"}
                type={"email"}
                onChange={(event) => {
                  if (
                    event.target.checkValidity() &&
                    event.target.value.length !== 0 &&
                    event.target.value !== userData?.email
                  ) {
                    setChanged({
                      email: true,
                      pass: changed.pass,
                    });
                  } else {
                    setChanged({
                      email: false,
                      pass: changed.pass,
                    });
                  }
                }}
                placeholder={userData?.email}
              />
              <Input
                minLength={8}
                isRequired
                name={"password"}
                type={"password"}
                onChange={(event) => {
                  if (event.target.checkValidity()) {
                    setChanged({
                      pass: true,
                      email: changed.email,
                    });
                  } else {
                    setChanged({
                      pass: false,
                      email: changed.email,
                    });
                  }
                }}
                placeholder={"Current password"}
              />

              <Button
                type={"submit"}
                isLoading={saving}
                loadingText={"Updating your data"}
                isDisabled={!changed.email || !changed.pass ? true : false}
                leftIcon={<RiCheckFill />}
                colorScheme={"blue"}
              >
                Save changes
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfileSection;
