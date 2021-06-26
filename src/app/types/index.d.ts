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

export type Post = {
  body: string;
  comments?: [];
  author: string;
  private: boolean;
  attachments: {
    urls: [];
    objects: [];
  };
  hearts: {
    count: number;
  };
};
