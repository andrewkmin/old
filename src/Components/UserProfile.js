import PostsList from "./Posts";
import fetchUserData from "../api/fetchUserData";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { accountId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAccount = async () => {
      const data = await fetchUserData(accountId, "id");
      setData(data);
      return data;
    };
    fetchAccount();
  }, [accountId]);

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
          src={data.pictureUrl}
          alt={data.fullName}
        />
        <br />
        <div
          className="modal fade"
          id="user_image_modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="imageModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="imageModal">
                  {data.fullName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img src={data.pictureUrl} height="150" alt={data.fullName} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="account-name container">
        <h2 align="center" className="mt-2" id="fullName">
          {data.fullName}
        </h2>
      </div>

      <div className="account-info container">
        <p align="center" className="account-id">
          User ID: {data._id}
        </p>
        <p align="center" className="buttons">
          <button id="add_friend" className="btn btn-success">
            Add Friend
          </button>
        </p>
        <p align="center" className="account-bio pr-5 pl-5 pb-1" id="bio">
          {data.bio}
        </p>
      </div>
      <PostsList accountId={data.posts} />
    </div>
  );
};

export default UserProfile;
