import Section from "../Section";
import { useContext } from "react";
import DataContext from "../../data/data.context";
import { Avatar as ChakraAvatar, Stack } from "@chakra-ui/react";

const Avatar = () => {
  const { userData } = useContext(DataContext);

  return (
    <Section
      title={"Avatar"}
      subtitle={"Here you can see your avatar in all sizes and also change it!"}
    >
      <Stack alignItems={"flex-end"} direction={"row"}>
        {["lg", "md", "sm"].map((size, index) => {
          return (
            <ChakraAvatar
              key={index}
              size={size}
              src={userData?.avatar}
              name={userData?.firstName}
            />
          );
        })}
      </Stack>
    </Section>
  );
};

export default Avatar;
