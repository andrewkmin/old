import PostList from "../components/PostList";
import CreatePost from "../components/Create/index";

const Home = () => {
  return (
    <>
      <CreatePost />
      <PostList />
    </>
  );
};

export default Home;
