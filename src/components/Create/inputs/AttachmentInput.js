import { useState, useRef } from "react";
import { IoMdImages } from "react-icons/io";
import { Button, Input } from "@chakra-ui/react";

const AttachmentInput = () => {
  const AttachmentInputRef = useRef();
  const [attachmentText, setAttachmentText] = useState("Photo/Video");
  return (
    <Button
      leftIcon={<IoMdImages color="green" />}
      variant={"outline"}
      w={"full"}
      onClick={() => {
        AttachmentInputRef.current.click();
      }}
      size={"md"}
    >
      {attachmentText}
      <Input
        onChange={(event) =>
          event.target.files.length === 0
            ? setAttachmentText("Photo/Video")
            : setAttachmentText(`Attached ${event.target.files.length} files`)
        }
        multiple
        accept={"image/*, video/*"}
        ref={AttachmentInputRef}
        display={"none"}
        type={"file"}
        name={"attachments"}
      />
    </Button>
  );
};

export default AttachmentInput;
