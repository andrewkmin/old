import { User } from "../../../types";
import axios from "../../../api/axios";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Stack,
  Tooltip,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

const EditBioControls = () => {
  const {
    isEditing,
    getEditButtonProps,
    getSubmitButtonProps,
    getCancelButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent={"center"} size={"sm"}>
      <IconButton
        icon={<CheckIcon />}
        aria-label={"Save bio"}
        {...getSubmitButtonProps()}
      />
      <IconButton
        icon={<CloseIcon />}
        aria-label={"Discard bio"}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent={"center"}>
      <Tooltip label={"Edit bio"} placement={"right"}>
        <IconButton
          size={"sm"}
          icon={<EditIcon />}
          aria-label={"Edit bio"}
          {...getEditButtonProps()}
        />
      </Tooltip>
    </Flex>
  );
};

interface EditBioProps {
  data?: User;
}

const EditBio = ({ data }: EditBioProps) => {
  const toast = useToast();
  // When the user finishes editing
  const handleUpdate = async (value: string) => {
    // Checking if the bios are the same or note
    if (value.toLowerCase() === data?.bio.toLowerCase()) return;
    // If they're not the same we send a request to the API
    else {
      // Creating a payload
      const payload = {
        bio: value,
      };
      // Sending the request
      const response = await axios.patch("/api/accounts/update", payload);

      switch (response.status) {
        case 200: {
          return toast({
            title: "Successfully updated!",
            status: "success",
            position: "bottom-right",
          });
        }
        default: {
          return toast({
            title: "Something went wrong",
            status: "error",
            position: "bottom-right",
          });
        }
      }
    }
  };

  return (
    <Editable
      textAlign={"center"}
      onSubmit={handleUpdate}
      defaultValue={data?.bio}
      placeholder={
        data?.bio?.length !== 0
          ? data?.bio
          : "Hmm 🤔, it seems like your account doesn't have a bio..."
      }
    >
      <Stack spacing={1}>
        <EditablePreview />
        <EditableInput name={"bio"} />
        <EditBioControls />
      </Stack>
    </Editable>
  );
};

export default EditBio;
