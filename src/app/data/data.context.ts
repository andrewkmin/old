import { User } from "../types";
import { createContext } from "react";

interface ContextProps {
  loading: boolean;
  authenticated: boolean;
  userData?: User | null;
}

const DataContext = createContext<ContextProps>({
  loading: true,
  userData: null,
  authenticated: false,
});

export default DataContext;
