import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

function MainPage() {
  return (
    <>
      <CreatePost />
      <PostsList posts={[]} />
    </>
  );
}

export default MainPage;
