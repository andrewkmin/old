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

// Token validation hook
export const useAuth = () => {
  const Authenticate = async () => {
    try {
      const data = await axios.get("/auth/verify");
      if (data.hasOwnProperty("error")) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return useQuery("authentication", Authenticate);
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
export const useFetchPosts = (accountId) => {
  const FetchPosts = async () => {
    const { data } = await axios.get(
      `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ``}`
    );
    return data;
  };

  return useQuery("posts", FetchPosts);
};

// Check friendship hook
export const useCheckFriendShip = (accountId) => {
  const CheckFriendship = async () => {
    const { data } = await axios.get(
      `/api/friends/check/?accountId=${accountId}`
    );
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
    refetchInterval: 5000, // 5 seconds
  });
};
