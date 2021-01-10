import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import _axios from "../helpers/_axios";

const Settings = () => {
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await _axios.get("/api/notifications/fetch");
      return data;
    };
    fetchNotifications();
  }, []);

  return <Box></Box>;
};

export default Settings;
