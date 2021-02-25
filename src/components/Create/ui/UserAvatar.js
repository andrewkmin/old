import { useContext } from "react";
import { Center, Avatar } from "@chakra-ui/react";

import DataContext from "../../../data/data.context";

const UserAvatar = () => {
  const { userData } = useContext(DataContext);
  return (
    <Center>
      <Avatar
        size={"md"}
        name={userData?.fullName}
        src={userData?.pictureUrl}
      />
    </Center>
  );
};

export default UserAvatar;
