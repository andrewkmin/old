import axios from "./axios";
import { Post, User } from "../types";

// Will be used for logging out
export const Logout = async () => {
  const { data } = await axios.post("/auth/logout");
  return data;
};

// Will be used for fetching posts at the homepage
export const FetchPosts = async (page?: number) => {
  const { data } = await axios.get<Post[]>("/api/posts/fetch", {
    params: {
      page,
    },
  });
  return data;
};

// Will be used for fetching account information
export const FetchAccount = async (username: string) => {
  const response = await axios.get<User>("/api/accounts/fetch", {
    params: {
      username,
    },
  });
  return response;
};

export const CheckFriendship = async (username: string) => {
  // TODO: Implement
};

export const FetchAccountStatus = async (username: string) => {
  const { data } = await axios.get("/api/network/status", {
    params: {
      username,
    },
  });
  return data;
};
