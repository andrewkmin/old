import { Post } from "../types";

const removePostFromArray = (posts: Post[], post: Post) =>
  posts.filter((other) => other.id !== post.id);

export default removePostFromArray;
