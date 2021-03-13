import { useEffect, useState } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";

export default function _Tabs() {
  const History = useHistory();
  const Location = useLocation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (Location.pathname === "/") setIndex(0);
    else if (Location.pathname === "/videos") setIndex(1);
    else setIndex(null);
    return () => {};
  }, [Location.pathname]);

  return (
    <Tabs index={index} defaultIndex={0}>
      <TabList>
        <Tab
          onClick={() => {
            setIndex(0);
            return History.push("/");
          }}
        >
          Home
        </Tab>
        <Tab
          onClick={() => {
            setIndex(1);
            return History.push("/videos");
          }}
        >
          Videos
        </Tab>
      </TabList>
    </Tabs>
  );
}
