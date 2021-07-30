import { createContext } from "react";
import { Post } from "../types";

interface PostListContextProps {
  setData: Function;
  data: Partial<Post>[] | undefined;
}

const PostListContext = createContext<PostListContextProps>({
  data: [],
  setData: () => {},
});

export default PostListContext;
