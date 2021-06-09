import React, { createContext } from "react";
const DataContext = createContext({
  data: {},
  setData: () => {},
  loading: true,
  setLoading: () => {},
  authenticated: false,
  setAuthenticated: (state) => {},
});

export default DataContext;
