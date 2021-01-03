const CreatePost = () => {
  let States = {
    PostInputState: "",
  };

  let Styles = {
    width: "100%",
    margin: "0 auto",
    maxWidth: "600px",
  };

  return (
    <div
      style={Styles}
      className="create-post bg-white container rounded shadow-sm create-post mb-5 mt-5 p-2 border"
    >
      <form encType="multipart/form-data">
        <div className="d-flex">
          <img
            height="50"
            width="50"
            src="https://picsum.photos/50/50"
            className="rounded-circle shadow-sm"
            alt="User Avatar"
          />
          <input
            type="text"
            className="form-control ms-2"
            name="text"
            id="postTextarea"
            placeholder="Create Post"
            onKeyUp={(event) => {
              const postButton = document.getElementById("postButton");

              States.PostInputState = event.target.value;

              if (event.target.value.length === 0) {
                postButton.setAttribute("disabled", "true");
              } else {
                postButton.removeAttribute("disabled");
              }
            }}
            style={{
              height: "inherit",
            }}
          />

          <button
            className="btn btn-primary ms-2"
            id="postButton"
            type="button"
            disabled
          >
            POST
          </button>
        </div>

        <hr className="solid" />

        <div className="d-flex">
          <button
            type="button"
            className="btn btn-light border w-100 me-2"
            data-bs-toggle="modal"
            data-bs-target="#photoModal"
          >
            <i className="fas fa-camera"></i>
            Photo
          </button>

          <button
            type="button"
            className="btn btn-light border w-100 me-2"
            data-bs-toggle="modal"
            data-bs-target="#videoModal"
          >
            <i className="fas fa-video"></i>
            Video
          </button>

          <button
            type="button"
            className="btn btn-light border w-100 me-2 disabled"
            disabled
          >
            <i className="fas fa-link"></i>
            Link
          </button>

          <div
            className="modal fade"
            id="photoModal"
            tabIndex="-1"
            aria-labelledby="photoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="photoModalLabel">
                    Upload a photo
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    id="imageUpload"
                    accept="image/gif, image/jpeg, image/png"
                    type="file"
                    name="image"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="videoModal"
            tabIndex="-1"
            aria-labelledby="videoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="videoModalLabel">
                    Upload a video
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    id="videoUpload"
                    accept="video/mp4,video/x-m4v,video/*"
                    type="file"
                    name="video"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
