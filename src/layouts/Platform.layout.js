import { useEffect } from "react";

import _WebSocket from "../utils/websocket";
import Navbar from "../components/Navbar/index";

const PlatformLayout = ({ children }) => {
  useEffect(() => {
    _WebSocket.ping();
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PlatformLayout;
