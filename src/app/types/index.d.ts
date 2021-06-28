export type User = {
  id: string;
  _id: string;
  __v: number;
  bio: string;
  email: string;
  avatar: string;
  lastName: string;
  private: boolean;
  firstName: string;
  theme: "light" | "dark";
};

type AttachmentUrl = {
  url: string;
  mimetype: string;
};

export type Post = {
  id: string;
  _id: string;
  body: string;
  comments?: [];
  private: boolean;
  attachments: {
    objects: string[];
    urls: AttachmentUrl[];
  };
  hearts: {
    count: number;
  };
  createdAt: string;
  author: Partial<User>;
};

export interface PostProps {
  data: Post;
}

export interface ContextProps {
  loading: boolean;
  authenticated: boolean;
  userData?: User | null;

  setState: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      authenticated: boolean;
      userData?: User | null;
    }>
  >;
}
