import {
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = () => {
  const [passVisible, setPassVisibility] = useState(false);
  const toggleVisibility = () => {
    passVisible ? setPassVisibility(false) : setPassVisibility(true);
  };

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement>
          <MdLock color="gray" />
        </InputLeftElement>
        <Input
          placeholder={"Password"}
          size={"md"}
          min={8}
          name={"password"}
          type={passVisible ? "text" : "password"}
          required
        />
        <InputRightElement>
          <IconButton
            variant={"ghost"}
            aria-label={passVisible ? "Mask password" : "Reveal password"}
            icon={passVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            onClick={() => toggleVisibility()}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
