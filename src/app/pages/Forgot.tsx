import axios from "../api/axios";
import { ChangeEvent, useState } from "react";
import { Box, FormControl, Input, Text } from "@chakra-ui/react";

// Page for resetting the password
const Forgot = () => {
  const [linkSent, setLinkSent] = useState(false);

  const handleReset = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Getting the email value field
    const email = event.target.email.value;
    // Sending the request
    const response = await axios.post("/auth/forgot", { email });
    // Checking response status
    switch (response.status) {
      case 200: {
        return setLinkSent(true);
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Box>
      {linkSent && "Sent"}
      <form onSubmit={handleReset}>
        <Text fontSize={"4xl"}>Forgot your password?</Text>
        <Text fontSize={"4xl"} color={"gray.500"}>
          No probs, we're gonna help you out!
        </Text>
        <Text>
          Just enter your email, so that we can send a reset link to ya
        </Text>
        <FormControl>
          <Input type={"email"} placeholder={"Your email"} name={"email"} />
        </FormControl>
      </form>
    </Box>
  );
};

export default Forgot;
