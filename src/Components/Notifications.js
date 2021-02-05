import {
  Box,
  Container,
  List,
  ListItem,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import _axios from "../api/_axios";
import { useState, useEffect, useRef } from "react";

const Notifications = () => {
  const fetchNotifications = useRef(() => {});
  const [notifications, setNotifications] = useState([]);

  fetchNotifications.current = async () => {
    const { data } = await _axios.get("/api/notifications/fetch");
    setNotifications(data);
    return data;
  };

  useEffect(() => {
    fetchNotifications.current();
  }, []);

  return (
    <Box>
      <Container>
        <Text fontSize="3xl">Notifications</Text>
        <Divider />
        <List mt={5}>
          {notifications.length !== 0 ? (
            notifications.map((notification) => {
              return (
                <ListItem key={notification._id}>
                  <Text fontSize="md">{notification.fullName}</Text>
                  <ButtonGroup variant="fill" spacing={2}>
                    <Button colorScheme="green">Accept friend request</Button>
                    <Button colorScheme="red">Decline friend request</Button>
                  </ButtonGroup>
                </ListItem>
              );
            })
          ) : (
            <Text fontSize="md">You don't have any notifications</Text>
          )}
        </List>
      </Container>
    </Box>
  );
};

export default Notifications;
