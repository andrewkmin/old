import User from "./User";
import { Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { User as UserType } from "../../../../types";
import DataContext from "../../../../data/data.context";

interface FollowersProps {
  followers: Partial<UserType>[];
}

const Following = ({ followers: users }: FollowersProps) => {
  const { userData } = useContext(DataContext);
  const [followers, setFollowers] = useState(users);

  return (
    <>
      {followers.map((user) => (
        <User key={user.id} user={user} />
      ))}
      {followers.length === 0 && (
        <Text fontWeight={"thin"} fontFamily={"ubuntu bold"}>
          Not following anyone yet
        </Text>
      )}
    </>
  );
};

export default Following;
