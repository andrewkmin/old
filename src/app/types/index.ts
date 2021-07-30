/**
 * Custom declarations
 */

export type User = {
  id: string;
  bio: string;
  cover: string;
  email: string;
  avatar: string;
  password: string;
  username: string;
  last_name: string;
  first_name: string;
  created_at: number;

  posts: Post[];
  comments: Comment[];
};

export type Relation = {
  id: string;
  to_user: string;
  from_user: string;
  created_at: number;
  status: RelationStatus;
};

export type RelationStatus = "BLOCKED" | "REQUESTED" | "FOLLOWING";

export type Post = {
  id: string;
  user: User;
  body: string;
  user_id: string;
  created_at: number;
  comments: Comment[];
  privacy: "PRIVATE" | "PUBLIC";
};

export type Comment = {
  id: string;
  user: User;
  post: Post;
  body: string;
  user_id: string;
  post_id: string;
  created_at: number;
};

export interface PostProps {
  data: Partial<Post>;
}

export interface CommentProps {
  data: Comment;
}

export type FieldError = {
  param: [];
  msg: string;
  value: string;
  location: string;
};

export type FieldErrorResponse = {
  errors?: FieldError[];
};

// export type PostResponse = {
//   next: number | null;
//   prev: number | null;
//   data: Partial<Post>[];
// };
