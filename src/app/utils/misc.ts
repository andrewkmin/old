import { Post } from "../types";

export const removePostFromArray = (posts: Post[], post: Post) => {
  posts.filter((other) => other.id !== post.id);
};
