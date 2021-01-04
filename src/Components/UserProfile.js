import { Link } from "react-router-dom";

const UserProfile = () => {
  const Styles = {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div className="container justify-content-center">
      <div className="container" style={Styles}>
        <img
          data-bs-toggle="modal"
          data-bs-target="#user_image_modal"
          role="button"
          className="rounded-circle"
          height="128"
          width="128"
          src="https://picsum.photos/128/128"
          alt="User Avatar"
        />
        <br />
        <div
          className="modal fade"
          id="user_image_modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="imageModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="imageModal">
                  John Doe
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src="https://picsum.photos/150/150"
                  height="150"
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="account-name container">
        <h2 align="center" className="mt-2" id="fullName">
          John Doe
        </h2>
      </div>

      <div className="account-info container">
        <p align="center" className="account-id">
          ID
          {/* TODO: Not yet implemented */}
          <Link id="accountId" to="!#">
            1234567890
          </Link>
        </p>
        <p align="center" className="buttons">
          <button id="add_friend" className="btn btn-success">
            Add Friend
          </button>
        </p>
        <p align="center" className="account-bio pr-5 pl-5 pb-1" id="bio">
          Account Bio
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
