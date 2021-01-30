import Posts from "../components/Posts";
import { Helmet } from "react-helmet-async";
import CreatePost from "../components/CreatePost";

const Platform = () => {
  return (
    <>
      <Helmet>
        <title>Homepage — Usocial</title>
      </Helmet>

      <CreatePost />
      <Posts />
    </>
  );
};

export default Platform;
