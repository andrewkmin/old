import { Skeleton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import Routes from "../app/routes/routes";
import DataContext from "../app/data/data.context";
import verification from "../app/auth/verification";

const Entry = () => {
  const [state, setState] = useState({
    loading: true,
    userData: {},
    authenticated: false,
  });
  const checkUserIsValid = useRef();

  checkUserIsValid.current = async () => {
    try {
      const isValid = await verification.verify();

      try {
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
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    checkUserIsValid.current();
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
