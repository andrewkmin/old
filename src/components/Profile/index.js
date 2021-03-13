import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container, useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

import User from "./Sections/User";
import _axios from "../../api/_axios";
import Buttons from "./Sections/Buttons";
import Timeline from "./Sections/Timeline";

const Profile = () => {
  const Toast = useToast();
  const History = useHistory();
  const { accountId } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserStatus, setCurrentUserStatus] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await _axios.get(
          `/api/accounts/fetch/${accountId ? `?accountId=${accountId}` : ""}`
        );

        setIsFetching(false);

        if (data) {
          if (data?.error) {
            Toast.closeAll();
            if (data?.code === "invalid_id".toUpperCase()) {
              return Toast({
                title: "The id that you entered was invalid",
                duration: 1000,
                isClosable: false,
                status: "info",
              });
            } else if (data?.code === "no_account".toUpperCase()) {
              return Toast({
                title: "There's no account with that id",
                duration: 3000,
                isClosable: false,
                status: "info",
              });
            } else {
              return History.push("/");
            }
          } else {
            try {
              const { data: status } = await _axios.get(
                `/api/network/status/?accountId=${accountId}`
              );

              // Setting the data of current profile
              setCurrentUser(data);
              // Setting the status of current profile
              return setCurrentUserStatus(status);
            } catch (error) {
              console.error(error);
              return Toast({
                title: "There was an error while fetching user's status",
                isClosable: false,
                duration: 2000,
                status: "warning",
              });
            }
          }
        }
      } catch (error) {
        console.error(error);
        return History.push("/");
      }
    };

    fetchUserData();
  }, [History, Toast, accountId]);

  return (
    <>
      <Helmet>
        <title>{`${currentUser?.firstName} ${currentUser?.lastName} on Usocial`}</title>
      </Helmet>

      <Container>
        <User
          status={currentUserStatus}
          isFetching={isFetching}
          data={currentUser}
        />
        <Buttons data={currentUser} isFetching={isFetching} />
        <Timeline data={currentUser} />
      </Container>
    </>
  );
};

export default Profile;
