import { useEffect, useState } from "react";
// import _axios from "../Helpers/_axios";
import axios from "axios";

const PostsList = () => {
  let Styles = {
    width: "100%",
    margin: "0 auto",
    maxWidth: "600px",
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setPosts(data);
      return data;
    }
    fetchAll();
  });

  return (
    <div style={Styles} className="posts container">
      {/* TODO: Implement fetching data from the API */}
      {JSON.stringify(posts)}
    </div>
  );
};

export default PostsList;
