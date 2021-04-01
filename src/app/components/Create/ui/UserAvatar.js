import { useContext } from "react";
import { Center, Avatar } from "@chakra-ui/react";

import DataContext from "../../../data/data.context";

const UserAvatar = () => {
  const { userData } = useContext(DataContext);

  return (
    <Center>
      <Avatar
        size={"md"}
        boxShadow={"md"}
        name={`${userData?.firstName} ${userData?.lastName}`}
        src={userData?.avatar}
      />
    </Center>
  );
};

export default UserAvatar;
