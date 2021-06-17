import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Button,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const AvatarInput = () => {
  // The state for tracking avatar persistence
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  // The ref for interacting with the hidden input element
  const AttachmentInputRef = useRef<HTMLInputElement | null>(null);

  // A function for emptying the avatar input
  const emptyAvatar = () => {
    AttachmentInputRef.current!!.value = "";
    setAvatarUploaded(false);
  };

  return (
    <FormControl>
      <FormLabel>Avatar (optional)</FormLabel>
      <InputGroup>
        <Button
          w={"full"}
          // Virtually clicking the hidden image attachment button to select a file
          onClick={() => AttachmentInputRef.current?.click()}
        >
          {/* The text that will be shown */}
          {avatarUploaded ? "Avatar selected" : "Click to select an avatar"}
          {/* Invisible input that will act as the image input */}
          <Input
            type={"file"}
            name={"avatar"}
            display={"none"}
            multiple={false}
            accept={"image/*"}
            ref={AttachmentInputRef}
            onChange={(event) => {
              event.target.files?.length !== 0
                ? setAvatarUploaded(true)
                : setAvatarUploaded(false);
            }}
          />
        </Button>
        {/* The button for removing the avatar */}
        <Tooltip isDisabled={!avatarUploaded} label={"Remove avatar"}>
          <IconButton
            aria-label={"Remove avatar"}
            ms={2}
            icon={<DeleteIcon color={"red.400"} />}
            isDisabled={!avatarUploaded}
            onClick={() => emptyAvatar()}
          />
        </Tooltip>
      </InputGroup>
    </FormControl>
  );
};

export default AvatarInput;
