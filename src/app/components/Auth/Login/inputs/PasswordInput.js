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
  const [toggleVisible, setToggleVisible] = useState(false);

  // For toggling password visibility
  const toggleVisibility = () =>
    passVisible ? setPassVisibility(false) : setPassVisibility(true);

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement>
          <MdLock color="gray" />
        </InputLeftElement>

        <Input
          onBlur={() => setToggleVisible(false)}
          onFocus={() => setToggleVisible(true)}
          placeholder={"Password"}
          size={"md"}
          minLength={8}
          name={"password"}
          type={passVisible ? "text" : "password"}
          required
        />

        <InputRightElement display={!toggleVisible && "none"}>
          <IconButton
            variant={"ghost"}
            icon={passVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            onClick={() => toggleVisibility()}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
