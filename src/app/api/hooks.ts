import axios from "./axios";
import { User } from "../types";
import { useQuery } from "react-query";

// Logout hook
export const useLogout = () => {
  const Logout = async () => {
    const { data } = await axios.post("/auth/logout");
    return data;
  };

  return useQuery("logout", Logout);
};


// Check friendship hook
export const useCheckFriendship = (
  accountId: String = "",
  depArray?: any[]
) => {
  const CheckFriendship = async () => {
    const { data } = await axios.get(`/api/friends/${accountId}/check/`);
    return data;
  };

  return useQuery(["friendship status", depArray], CheckFriendship);
};

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

// Fetch account hook
export const useFetchUser = (username: String = "", depArray?: any[]) => {
  const FetchAccount = async () => {
    const { data, status } = await axios.get<User>("/api/accounts/fetch", {
      params: {
        username,
      },
    });
    return { data, status };
  };

  return useQuery(["user data", depArray], FetchAccount);
};

export const useFetchUserStatus = (
  username: String = "",
  depArray?: any[]
) => {
  const FetchAccountStatus = async () => {
    const { data } = await axios.get("/api/network/status", {
      params: {
        username,
      },
    });
    return data;
  };

  return useQuery(["user status", depArray], FetchAccountStatus);
};
