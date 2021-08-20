import { User } from "../../../types";
import axios from "../../../api/axios";
import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import ProfileContext from "../../../contexts/profile.context";

type Status = "FOLLOWING" | "BLOCKED" | "REQUESTED";

interface ActionsProps {
  state: ActionStateProps;
}

interface ActionStateProps {
  user: User;
  status: Status;
}

const Actions = ({ state: { status: staticStatus, user } }: ActionsProps) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const toast = useToast({ position: "bottom-left" });
  const { state, setState } = useContext(ProfileContext);
  const [status, setStatus] = useState<Status | null>(staticStatus);

  // For sending a follow request
  const followRequest = async () => {
    // Enabling the loader
    setLoading(true);

    // Sending the request
    const { status, data } = await axios.post(
      `/api/relations/${user?.id!!}/follow`
    );

    // Disabling the loader
    setLoading(false);

    // If everything's fine
    if (status === 200) setStatus(data);
    else if (status === 409) {
      toast({ title: "You already follow this user", status: "warning" });
    }
  };

  // For un-following a user
  const unfollowRequest = async () => {
    setLoading(true);

    const { status, data } = await axios.post(
      `/api/relations/${user?.id!!}/unfollow`
    );

    setLoading(false);

    if (status === 200) setStatus(data);
    else toast();
  };

  // Button trigger based on status
  const triggerAction = () => {
    if (status === "FOLLOWING") unfollowRequest();
    else if (status === null) followRequest();
  };

  useEffect(() => {
    // Setting initial button text
    if (status === null) setButtonText("Follow");
    else if (status === "FOLLOWING") setButtonText("Following");
    else if (status === "REQUESTED") setButtonText("Requested");

    return () => setButtonText("");
  }, [status]);

  return (
    <Button
      size={"md"}
      rounded={"xl"}
      isLoading={loading}
      colorScheme={"purple"}
      bgColor={
        status === "FOLLOWING"
          ? "purple.300"
          : status === "REQUESTED"
          ? "orange.400"
          : "purple.400"
      }
      onClick={() => triggerAction()}
    >
      {buttonText}
    </Button>
  );
};

export default Actions;
