import axios from "./axios";
import { Post, User } from "../@types";
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
export const useFetchPosts = (username: String = "", depArray?: any[]) => {
  const FetchPosts = async () => {
    const { data } = await axios.get<Post[]>("/api/posts/fetch", {
      params: {
        username,
      },
    });
    return data;
  };

  return useQuery(["posts", depArray], FetchPosts);
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
export const useFetchAccount = (username: String = "", depArray?: any[]) => {
  const FetchAccount = async () => {
    const response = await axios.get<User>("/api/accounts/fetch", {
      params: {
        username,
      },
    });
    return response;
  };

  return useQuery(["user data", depArray], FetchAccount);
};

export const useFetchAccountStatus = (
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
