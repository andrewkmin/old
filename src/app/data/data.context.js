import { createContext } from "react";

const DataContext = createContext({
  data: {},
  loading: true,
  authenticated: false,
});

export default DataContext;
