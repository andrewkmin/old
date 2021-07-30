import millify from "millify";
import { useState } from "react";
import { User } from "../../../types";
import StatsModal from "./components/StatsModal";
import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";

interface StatsProps {
  state: StatsStateProps;
}

interface StatsStateProps {
  user: Partial<User>;
  followers: Partial<User>[];
  following: Partial<User>[];
}

const Stats = ({ state: { followers, following, user } }: StatsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Stack spacing={4} direction={["column", "row"]}>
        <Button
          size={"lg"}
          filter={"brightness(105%)"}
          rounded={"xl"}
          onClick={() => {
            setActiveTab(0);
            onOpen();
          }}
        >
          {followers?.length === 0 && "No"}
          {followers?.length !== 0 && (
            <>
              {millify(followers?.length)}{" "}
              {followers?.length > 1 ? "followers" : "follower"}
            </>
          )}{" "}
          {followers?.length === 0 && "followers"}
        </Button>

        <Button
          size={"lg"}
          rounded={"xl"}
          filter={"brightness(105%)"}
          onClick={() => {
            setActiveTab(1);
            onOpen();
          }}
        >
          {following?.length === 0 && "Not following anyone"}
          {following?.length !== 0 && (
            <>{millify(following?.length)} following</>
          )}
        </Button>
      </Stack>

      <StatsModal
        state={{
          user,
          isOpen,
          onClose,
          activeTab,
          followers,
          following,
        }}
      />
    </Box>
  );
};

export default Stats;
