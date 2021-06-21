import { useState, useRef, ChangeEvent } from "react";
import { IoMdImages } from "react-icons/io";
import { Button, Input } from "@chakra-ui/react";

/**
 * Post attachment input
 * This is the input where all the files will be uploaded into
 */
const AttachmentInput = () => {
  // The ref for interacting with the hidden input element
  const AttachmentInputRef = useRef<HTMLInputElement>(null);
  // The text that will be shown if no media was uploaded
  const [attachmentText, setAttachmentText] = useState("Media");
  // Handle file change
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    // If there are no files attached
    if (event.target.files.length === 0) setAttachmentText("Photo/Video");
    // If there are some files attached
    else {
      // Dynamic suffix or something
      const suffix = event.target.files.length > 1 ? "s" : "";
      // Update the text
      setAttachmentText(`Attached ${event.target.files.length} file${suffix}`);
    }
  };

  return (
    <Button
      w={"full"}
      size={"md"}
      boxShadow={"sm"}
      variant={"outline"}
      leftIcon={<IoMdImages color="green" />}
      // Virtually click the attachment input and select files from there
      onClick={() => AttachmentInputRef.current?.click()}
    >
      {/* Dynamic text */}
      {attachmentText}
      {/* Invisible attachment input */}
      <Input
        multiple
        type={"file"}
        display={"none"}
        name={"attachments"}
        ref={AttachmentInputRef}
        accept={"image/*, video/*"}
        onChange={handleFileChange}
      />
    </Button>
  );
};

export default AttachmentInput;
