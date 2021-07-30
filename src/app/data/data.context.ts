import { User } from "../types";
import { createContext } from "react";

interface ContextProps {
  loading: boolean;
  authenticated: boolean;
  userData?: User | null;

  setState: React.Dispatch<
    React.SetStateAction<
      Partial<{
        loading: ContextProps["loading"];
        userData?: ContextProps["userData"];
        authenticated: ContextProps["authenticated"];
      }>
    >
  >;
}

const DataContext = createContext<ContextProps>({
  loading: true,
  userData: null,
  setState: () => {},
  authenticated: false,
});

export default DataContext;
