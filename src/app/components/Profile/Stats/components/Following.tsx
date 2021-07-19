import User from "./User";
import { Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { User as UserType } from "../../../../types";
import DataContext from "../../../../data/data.context";

interface FollowingProps {
  following: Partial<UserType>[];
}

const Following = ({ following: users }: FollowingProps) => {
  const { userData } = useContext(DataContext);
  const [following, setFollowing] = useState(users);

  return (
    <>
      {following.map((user) => (
        <User key={user.id} user={user} />
      ))}
      {following.length === 0 && (
        <Text fontWeight={"thin"} fontFamily={"ubuntu bold"}>
          Not following anyone yet
        </Text>
      )}
    </>
  );
};

export default Following;
