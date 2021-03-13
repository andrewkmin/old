import React, { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";

import Routes from "../routes/routes";
import DataContext from "../data/data.context";
import verification from "../auth/verification";

const Entry = () => {
  const [state, setState] = useState({
    loading: true,
    userData: {},
    authenticated: false,
  });

  useEffect(() => {
    const checkUserIsValid = async () => {
      try {
        const isValid = await verification.verify();
        return isValid;
      } catch (error) {
        console.error(error);
        return error;
      }
    };

    const checkValidity = async () => {
      try {
        const isValid = await checkUserIsValid();
        return setState({
          loading: false,
          authenticated: isValid,
          userData: verification.getUserData(),
        });
      } catch (error) {
        console.error(error);
        return setState({
          loading: false,
          authenticated: false,
          userData: {},
        });
      }
    };
    checkValidity();

    return () => {};
  }, []);

  return (
    <DataContext.Provider
      value={{
        userData: state.userData,
        authenticated: state.authenticated,
        loading: state.loading,
        setState,
      }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      {state.loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
    </DataContext.Provider>
  );
};

export default Entry;
