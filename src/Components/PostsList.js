const PostsList = ({ posts }) => {
  let Styles = {
    width: "100%",
    margin: "0 auto",
    maxWidth: "600px",
  };

  return (
    <div style={Styles} className="posts container">
      {JSON.stringify(posts)}
    </div>
  );
};

export default PostsList;
