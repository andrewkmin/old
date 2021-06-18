import { createContext } from "react";

type User = {
  _id: string;
  __v: number;
  bio: string;
  email: string;
  avatar: string;
  lastName: string;
  private: boolean;
  firstName: string;

  posts: [];
  friends: [];
  notifications: [];
};

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
