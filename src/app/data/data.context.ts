import { createContext } from "react";
import { ContextProps } from "../types";

const DataContext = createContext<ContextProps>({
  loading: true,
  userData: null,
  setState: () => {},
  authenticated: false,
});

export default DataContext;
