import axios from "./axios";
import { Post, User } from "../types";

// Will be used for logging out
export const Logout = async () => {
  const { data } = await axios.post("/auth/logout");
  return data;
};

// Will be used for fetching posts at the homepage
export const FetchPosts = async (page?: number) => {
  const { data } = await axios.get<Post[]>("/api/posts", {
    params: {
      page,
    },
  });

  return data;
};

// Will be used for fetching the posts of an account
export const FetchUserPosts = async (username: string) => {
  const { data } = await axios.get<Post[]>("/api/posts", {
    params: {
      username,
    },
  });

  return data;
};

// Will be used for fetching account information
export const FetchUser = async (username: string) => {
  const response = await axios.get<User>(`/api/accounts/${username}`);
  return response;
};

// For fetching relations between accounts
export const FetchRelation = async (id: string) => {
  const { data } = await axios.get(`/api/relations/${id}`);
  return data;
};

// For fetching online/offline status
export const FetchUserStatus = async (username: string) => {
  const { data } = await axios.get("/api/network/status", {
    params: {
      username,
    },
  });
  return data;
};

// For fetching user's followers
export const FetchFollowers = async (id: string) => {
  const { data } = await axios.get(`/api/relations/${id}/followers`);
  return data;
};

export const FetchFollowing = async (id: string) => {
  const { data } = await axios.get(`/api/relations/${id}/following`);
  return data;
};
