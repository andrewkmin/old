import axios from "./axios";
import { useQuery } from "react-query";

// Logout hook
export const useLogout = () => {
  const Logout = async () => {
    const { data } = await axios.post("/auth/logout");
    return data;
  };

  return useQuery("logout", Logout);
};

// Notification fetching hook
export const useFetchNotifications = () => {
  const FetchNotifications = async () => {
    const { data } = await axios.get("/api/notifications/fetch");
    return data;
  };

  return useQuery("notifications", FetchNotifications, {
    refetchInterval: 60 * 1 * 1000, // 1 minute
  });
};

// Fetching posts hook
export const useFetchPosts = (accountId?: String) => {
  const FetchPosts = async () => {
    const { data } = await axios.get(
      `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ""}`
    );
    return data;
  };

  return useQuery("posts", FetchPosts);
};

// Check friendship hook
export const useCheckFriendShip = (accountId: String) => {
  const CheckFriendship = async () => {
    const { data } = await axios.get(`/api/friends/${accountId}/check/`);
    return data;
  };

  return useQuery("friendship status", CheckFriendship);
};

// Heartbeat hook
export const useSendHeartbeat = () => {
  const SendHeartbeat = async () => {
    const { data } = await axios.get("/api/network/heartbeat");
    return data;
  };

  return useQuery("heartbeat", SendHeartbeat, {
    refetchInterval: 1000 * 5 * 60, // 5 seconds
  });
};

// Fetch account hook
export const useFetchAccount = (accountId: String) => {
  const FetchAccount = async () => {
    const response = await axios.get(
      `/api/acconts/fetch${accountId ? `/?accountId=${accountId}` : null}`
    );
    return response;
  };

  return useQuery("user data", FetchAccount);
};