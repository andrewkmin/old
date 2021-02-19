import _axios from "./_axios";
import { useState } from "react";

const FetchFunction = (url, method, body = {}) => {
  const [states, updateState] = useState({
    isFetching: true,
    data: {},
    isError: false,
  });

  try {
    const { data } =  _axios.request({
      url: url,
      data: body,
      method: method,
    });
    updateState({
      isFetching: false,
      data: data,
    });
  } catch (error) {
    console.error(error);
    updateState({
      isFetching: false,
      isError: true,
    });
  }

  return states;
};

// For creating a comment
export const useCreateComment = (post, payload) => {
  return FetchFunction(
    `/api/posts/comments/create/?postId=${post?.postData?._id}`,
    "POST",
    payload
  );
};

// For saving a post
export const useSavePost = (post) => {
  return FetchFunction(`/api/posts/save/?postId=${post?.postData?._id}`, "PUT");
};

// For hearting a post
export const useHeartPost = (post) => {
  return FetchFunction(
    `/api/posts/heart/?postId=${post?.postData?._id}`,
    "PUT"
  );
};

// For deleting a post
export const useDeletePost = (post) => {
  return FetchFunction(
    `/api/posts/delete/?postId=${post?.postData?._id}`,
    "DELETE"
  );
};

// For unsaving a post
export const useUnsavePost = (post) => {
  return FetchFunction(
    `/api/posts/unsave/?postId=${post?.postData?._id}`,
    "PUT"
  );
};

// For unhearting a post
export const useUnheartPost = (post) => {
  return FetchFunction(
    `/api/posts/unheart/?postId=${post?.postData?._id}`,
    "PUT"
  );
};
