import { useState, useRef } from "react";
import { IoMdImages } from "react-icons/io";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";

const AttachmentInput = () => {
  const AttachmentInputRef = useRef();
  const [attachmentText, setAttachmentText] = useState("Photo/Video");
  return (
    <Flex>
      <Button
        leftIcon={<IoMdImages color="green" />}
        _focus={false}
        variant={"outline"}
        w={"full"}
        onClick={() => {
          AttachmentInputRef.current.click();
        }}
        size={isMobile ? "sm" : "md"}
      >
        <Text fontSize={isMobile ? "xs" : "md"}>{attachmentText}</Text>
        <Input
          onChange={(event) => {
            if (event.target.files.length === 0) {
              setAttachmentText("Photo/Video");
            } else {
              setAttachmentText(`Attached ${event.target.files.length} files`);
            }
          }}
          multiple
          accept="image/*, video/*"
          ref={AttachmentInputRef}
          display="none"
          type="file"
          name="attachments"
        />
      </Button>
    </Flex>
  );
};

export default AttachmentInput;
