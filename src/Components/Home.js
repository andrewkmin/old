import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

function Home() {
  return (
    <div className="container">
      <CreatePost />
      <PostsList />
    </div>
  );
}

export default Home;
