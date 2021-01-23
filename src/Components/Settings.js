import {
  Box,
  Container,
  Text,
  Divider,
  List,
  ListItem,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import _axios from "../helpers/_axios";

const Settings = () => {
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await _axios.get("/api/notifications/fetch");
      return data;
    };
    fetchNotifications();
  }, []);

  return (
    <>
      <Helmet>
        <title>Settings — Usocial</title>
      </Helmet>
      <Box>
        <Container>
          <Text fontSize="3xl">Settings</Text>
          <Divider />
          <List mt={5}></List>
        </Container>
      </Box>
    </>
  );
};

export default Settings;
