import { useQuery } from "react-query";

import _axios from "./_axios";

// For logging out
export const useLogout = () => {
  const Logout = async () => {
    const { data } = await _axios.post("/auth/logout");
    return data;
  };
  return useQuery("logout", Logout);
};

export const useAuth = () => {
  const Authenticate = async () => {
    try {
      const data = await _axios.get("/auth/verify");
      if (data.hasOwnProperty("error")) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return useQuery("authenticate", Authenticate);
};

// For fetching notifications
export const useFetchNotifications = () => {
  const FetchNotifications = async () => {
    const { data } = await _axios.get("/api/notifications/fetch");
    return data;
  };
  return useQuery("notifications", FetchNotifications, {
    refetchInterval: 60 * 1 * 1000, // 1 minute
  });
};

// For fetching posts
export const useFetchPosts = (accountId) => {
  const FetchPosts = async () => {
    const { data } = await _axios.get(
      `/api/posts/fetch/${accountId ? `?accountId=${accountId}` : ``}`
    );
    return data;
  };
  return useQuery("posts", FetchPosts);
};

// For fetching friendship status with an account
export const useCheckFriendShip = (accountId) => {
  const CheckFriendship = async () => {
    const { data } = await _axios.get(
      `/api/friends/check/?accountId=${accountId}`
    );
    return data;
  };
  return useQuery("friendshipStatus", CheckFriendship);
};

// For sending a heartbeat to the network api to indicate that current user is connected to the servers
export const useSendHeartbeat = () => {
  const SendHeartbeat = async () => {
    const { data } = await _axios.get("/api/network/heartbeat");
    return data;
  };
  return useQuery("heartbeat", SendHeartbeat, {
    refetchInterval: 5000, // 5 seconds
  });
};
