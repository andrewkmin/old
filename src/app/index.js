import React from "react";
import { Skeleton } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";

import Routes from "../routes/routes";
import DataContext from "../data/data.context";
import verification from "../auth/verification";

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userData: {},
      authenticated: false,
    };
  }

  updateState({ data }) {
    this.setState(data);
  }

  async checkUserIsValid() {
    try {
      const isValid = await verification.verify();
      return isValid;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async checkValidity() {
    const isValid = await this.checkUserIsValid();
    return this.setState({
      loading: false,
      authenticated: isValid,
      userData: verification.getUserData(),
    });
  }

  async componentDidMount() {
    try {
      await this.checkValidity();
      setInterval(async () => {
        await this.checkValidity();
      }, 60 * 5 * 1000);
    } catch (error) {
      return this.setState({
        userData: {},
        loading: false,
        authenticated: false,
      });
    }
  }

  render() {
    const setState = this.setState.bind(this);
    const { authenticated, loading, userData } = this.state;

    return (
      // <AuthContext.Provider value={{ authenticated, loading }}>
      <DataContext.Provider
        value={{ userData, authenticated, loading, setState }}
      >
        <ReactQueryDevtools initialIsOpen={false} />
        {loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
      </DataContext.Provider>
      // </AuthContext.Provider>
    );
  }
}
