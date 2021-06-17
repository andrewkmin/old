import { createContext } from "react";

const DataContext = createContext({
  data: {},
  // TODO: Might remove later when I find a solution to activate suspense while react-query/axios are making requests
  loading: true,
  authenticated: false,
});

export default DataContext;
