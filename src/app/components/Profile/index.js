import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

import User from "./Sections/User";
import axios from "../../api/axios";

const Profile = () => {
  const Toast = useToast();
  const History = useHistory();
  const { accountId } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserStatus, setCurrentUserStatus] = useState({
    connected: false,
  });

  useEffect(() => {
    // Used for fetching user data
    const fetchUserData = async () => {
      // Send the request
      const response = await axios.get(
        `/api/accounts/fetch/${accountId ? `?accountId=${accountId}` : ""}`
      );

      // Checking response status
      switch (response.status) {
        // If everything is fine
        case 200: {
          return setCurrentUser(response.data);
        }
        // If the ID was invalid
        case 400: {
          Toast({
            title: "Invalid user ID",
            duration: 1000,
            isClosable: false,
            status: "info",
          });
          return History.push("/");
        }
        // If user doesn't exist
        case 404: {
          Toast({
            title: "That user doesn't exist",
            duration: 1000,
            isClosable: false,
            status: "info",
          });
          return History.push("/");
        }
        // Something else
        default: {
          return History.push("/");
        }
      }
    };

    // For fetching user status
    const fetchUserStatus = async () => {
      // Sending the request
      const request = await axios.get(`/api/network/status/?id=${accountId}`);

      // Checking the response
      switch (request.status) {
        // If everything is fine
        case 200: {
          const { connected } = request.data;
          return setCurrentUserStatus({ connected });
        }
        // If not
        default:
          return setCurrentUserStatus({ connected: false });
      }
    };

    // For fetching everything in one function
    const fetchEverything = async () => {
      await Promise.all([fetchUserData(), fetchUserStatus()]);
      return setIsFetching(false);
    };

    // Fetching everything
    fetchEverything();
    return () => {};
  }, [History, Toast, accountId]);

  return (
    <>
      <Helmet>
        <title>{`${currentUser?.firstName} ${currentUser?.lastName} - Usocial`}</title>
      </Helmet>

      <Container>
        <User
          status={currentUserStatus}
          isFetching={isFetching}
          data={currentUser}
        />
      </Container>
    </>
  );
};

export default Profile;
