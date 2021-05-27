import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Center,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdLock } from "react-icons/md";
import { passwordStrength } from "check-password-strength";

const PasswordInput = () => {
  const [sliderState, setSliderState] = useState({
    color: "",
    value: 0,
    text: "",
  });
  const evalStrengthColor = (strength) => {
    switch (strength) {
      case 0: {
        return "";
      }
      case 1: {
        return "orange";
      }
      case 2: {
        return "blue";
      }
      default: {
        return "teal";
      }
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;

    if (value.length === 0) {
      setSliderState({
        value: 0,
        text: "",
        color: "",
      });
    } else {
      const strength = passwordStrength(value);

      setSliderState({
        value: strength.id,
        text: strength.value,
        color: evalStrengthColor(strength.id),
      });
    }
  };

  return (
    <FormControl isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <MdLock color="gray" />
        </InputLeftElement>
        <Input
          onChange={(event) => handlePasswordChange(event)}
          required
          minLength={8}
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          size={"md"}
        />
      </InputGroup>

      {/* Password strength bar */}
      <Slider
        defaultValue={0}
        value={sliderState.value}
        min={0}
        max={3}
        step={1}
      >
        <SliderTrack>
          <Box position={"relative"} right={10} />
          <SliderFilledTrack bgColor={sliderState.color} />
        </SliderTrack>
      </Slider>
      <Center>
        <Text fontWeight={"semibold"}>{sliderState.text}</Text>
      </Center>
    </FormControl>
  );
};

export default PasswordInput;
