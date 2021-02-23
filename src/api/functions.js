import _axios from "./_axios";

const FetchFunction = (url, method, body = {}) => {
  try {
    const { data } = _axios.request({
      url: url,
      data: body,
      method: method,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// For creating a comment
export const CreateComment = (post, payload) => {
  return FetchFunction(
    `/api/posts/comments/create/?postId=${post?.postData?._id}`,
    "POST",
    payload
  );
};

// For saving a post
export const SavePost = (post) => {
  return FetchFunction(`/api/posts/save/?postId=${post?.postData?._id}`, "PUT");
};

// For hearting a post
export const HeartPost = (post) => {
  return FetchFunction(
    `/api/posts/heart/?postId=${post?.postData?._id}`,
    "PUT"
  );
};

// For deleting a post
export const DeletePost = (post) => {
  return FetchFunction(
    `/api/posts/delete/?postId=${post?.postData?._id}`,
    "DELETE"
  );
};

// For unsaving a post
export const UnsavePost = (post) => {
  return FetchFunction(
    `/api/posts/unsave/?postId=${post?.postData?._id}`,
    "PUT"
  );
};

// For unhearting a post
export const UnheartPost = (post) => {
  return FetchFunction(
    `/api/posts/unheart/?postId=${post?.postData?._id}`,
    "PUT"
  );
};
