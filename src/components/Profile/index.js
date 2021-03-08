import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Container, useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

import User from "./Sections/User";
import Buttons from "./Sections/Buttons";
import Timeline from "./Sections/Timeline";
import { useFetchUserData, useFetchUserStatus } from "../../api/hooks";

const Profile = () => {
  const Toast = useToast();
  const History = useHistory();
  const { accountId } = useParams();
  const { data: userStatus } = useFetchUserStatus(accountId);
  const { data, isFetched, isFetching, isError } = useFetchUserData(accountId);

  useEffect(() => {
    if (isFetched) {
      if (data?.error) {
        Toast.closeAll();
        if (data?.code === "invalid_id".toUpperCase()) {
          Toast({
            title: "The id that you entered was invalid",
            duration: 1000,
            isClosable: false,
            status: "info",
          });
        } else if (data?.code === "no_account".toUpperCase()) {
          Toast({
            title: "There's no account with that id",
            duration: 3000,
            isClosable: false,
            status: "info",
          });
        }

        return History.push("/");
      }
    }
    if (isError) return History.push("/");
  }, [History, data?.error, isError, isFetched, data?.code, Toast]);

  return (
    <>
      <Helmet>
        <title>{`${data?.firstName} ${data?.lastName} on Usocial`}</title>
      </Helmet>

      <Container>
        <User connected={userStatus} isFetching={isFetching} data={data} />
        <Buttons data={data} isFetching={isFetching} />
        <Timeline data={data} />
      </Container>
    </>
  );
};

export default Profile;
