import axios from "./axios";
import { useQuery } from "react-query";

// Heartbeat hook
export const useSendHeartbeat = () => {
  const SendHeartbeat = async () => {
    const { data } = await axios.get("/api/network/heartbeat");
    return data;
  };

  return useQuery("heartbeat", SendHeartbeat, {
    refetchInterval: 1000 * 5 * 60, // 5 minutes
  });
};
