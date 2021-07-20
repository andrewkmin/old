import axios from "./axios";
import { Post, User } from "../types";

// Will be used for logging out
export const Logout = async () => {
  const { data } = await axios.post("/auth/logout");
  return data;
};

// Will be used for fetching random posts
export const FetchPosts = async (cursor?: number) => {
  const { data } = await axios.get("/api/discover/posts", {
    params: {
      cursor,
    },
  });
  return data;
};

// Will be used for fetching the posts of an account
export const FetchUserPosts = async (username: string) => {
  const { data } = await axios.get<Post[]>(`/api/${username}/posts`);
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

// Will be used for fetching the users that a user follows
export const FetchFollowing = async (id: string) => {
  const { data } = await axios.get(`/api/relations/${id}/following`);
  return data;
};
