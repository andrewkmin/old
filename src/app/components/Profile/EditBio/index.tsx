import { User } from "../../../types";
import axios from "../../../api/axios";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Stack,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface EditBioProps {
  data?: User;
}

const EditBioControls = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent={"center"} size={"sm"}>
      <IconButton
        isRound
        icon={<CheckIcon />}
        colorScheme={"purple"}
        aria-label={"Save bio"}
        {...getSubmitButtonProps()}
      />
      <IconButton
        isRound
        icon={<CloseIcon />}
        aria-label={"Discard bio"}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
};

const EditBio = ({ data }: EditBioProps) => {
  const toast = useToast({ position: "bottom-left" });

  // When the user finishes editing
  const handleUpdate = async (value: string) => {
    // Checking if the bios are the same or note
    if (value.toLowerCase() === data?.bio?.toLowerCase()) return;
    // If they're not the same we send a request to the API
    else {
      // Creating a payload
      const payload = {
        bio: value,
      };

      // Sending the request
      const { status } = await axios.patch<User>(
        "/api/accounts/update",
        payload
      );

      // Notifying the user about the change
      return toast({
        title:
          status === 200 ? "Successfully updated!" : "Something went wrong",
        status: status === 200 ? "success" : "error",
      });
    }
  };

  return (
    <Editable
      onSubmit={handleUpdate}
      defaultValue={data?.bio!!}
      placeholder={
        data?.bio?.length !== 0
          ? data?.bio!!
          : "Hmm 🤔, it seems like your account doesn't have a bio..."
      }
    >
      <Stack spacing={2}>
        <EditablePreview />
        <EditableInput />
        <EditBioControls />
      </Stack>
    </Editable>
  );
};

export default EditBio;
