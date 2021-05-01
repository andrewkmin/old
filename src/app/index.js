import { Skeleton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import axios from "./api/axios";
import Routes from "../app/routes/routes";
import { verify } from "../app/auth/verification";
import DataContext from "../app/data/data.context";

const Entry = () => {
  const authenticate = useRef();
  const [state, setState] = useState({
    loading: true,
    userData: {},
    authenticated: false,
  });

  // Fetching current user data and checking if it's valid
  authenticate.current = async () => {
    const isValid = await verify();

    if (!isValid) {
      return setState({
        userData: {},
        loading: false,
        authenticated: false,
      });
    }

    const { data: userData } = await axios.get("/api/accounts/fetch");

    return setState({
      userData,
      loading: false,
      authenticated: isValid,
    });
  };

  useEffect(() => {
    // Only invoking the check function if the user is not authenticated
    if (!state?.authenticated) authenticate.current();
    return () => {};
  }, [state?.authenticated]);

  return (
    <DataContext.Provider
      value={{
        setState,
        loading: state?.loading,
        userData: state?.userData,
        authenticated: state?.authenticated,
      }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      {state?.loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
    </DataContext.Provider>
  );
};

export default Entry;
