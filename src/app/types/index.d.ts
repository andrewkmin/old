export type User = {
  id: string;
  bio: string;
  email?: string;
  avatar: string;
  posts?: Post[];
  username: string;
  prviate: boolean;
  password?: string;
  last_name: string;
  first_name: string;
  created_at: number;
  comments?: Comment[];
};

export type Post = {
  id: string;
  user?: User;
  body: string;
  user_id: string;
  created_at: number;
  comments: Comment[];
  privacy: "PUBLIC" | "PRIVATE";
};

export type Comment = {
  id: string;
  user?: User;
  body: string;
  user_id: string;
  post_id: string;
  created_at: number;
};

export type AttachmentUrl = {};

export interface PostProps {
  data: Post;
}
export interface ContextProps {
  loading: boolean;
  authenticated: boolean;
  userData?: User | null;

  setState: React.Dispatch<
    React.SetStateAction<
      Partial<{
        loading: boolean;
        authenticated: boolean;
        userData?: User | null;
      }>
    >
  >;
}
