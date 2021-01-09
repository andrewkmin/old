import Welcome from "../components/Welcome";
import Platform from "../components/Platform";
import NotFound from "../components/NotFound";
import PrivateRoute from "../routes/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            Component={Platform}
            path="/"
            redirectPath="/welcome"
          />
          <PrivateRoute
            exact
            swap
            Component={Welcome}
            path="/welcome"
            redirectPath="/"
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
