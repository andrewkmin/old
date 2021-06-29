export type User = {
  id: string;
  email: string;
  roles: Role[];
  avatar: string;
  createdAt: Date;
  username: string;
  lastName: string;
  password: string;
  firstName: string;
  bio: string | null;
  privateAccount: boolean;
  theme: "light" | "dark";
};

type AttachmentUrl = {
  url: string;
  mimetype: string;
};

export type Post = {
  id: string;
  body: string;
  user: ?User;
  userId: string;
  createdAt: Date;
};

export type Comment = {
  id: string;
  body: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

export type Notification = {
  id: string;
  belongsTo: string | null;
};

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
