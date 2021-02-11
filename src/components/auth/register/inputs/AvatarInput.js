import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { GoCheck } from "react-icons/go";
import { IoImage } from "react-icons/io5";

const AvatarInput = () => {
  const AttachmentInputRef = useRef();
  const [avatarUploaded, setAvatarUploaded] = useState(false);

  return (
    <FormControl>
      <FormLabel>Avatar (optional)</FormLabel>
      <InputGroup>
        <Button
          _focus={false}
          variant={"outline"}
          w={"full"}
          rightIcon={
            !avatarUploaded ? (
              <IoImage color={"gray"} />
            ) : (
              <GoCheck color={"lightgreen"} />
            )
          }
          onClick={() => AttachmentInputRef.current.click()}
        >
          <Center>
            {avatarUploaded
              ? "Avatar selected"
              : "Click here to select an avatar"}
          </Center>
          <Input
            type={"file"}
            name={"avatar"}
            display={"none"}
            accept="image/*"
            ref={AttachmentInputRef}
            onChange={(event) => {
              event.target.files.length !== 0
                ? setAvatarUploaded(true)
                : setAvatarUploaded(false);
            }}
          />
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default AvatarInput;
