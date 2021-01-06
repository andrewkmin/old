import _axios from "../helpers/_axios";

const fetchUserData = async (credentials, type) => {
  /**
   * @param {"token"} credentials
   * @param {"id"} credentials
   */
  if (type === "token") {
    const { data } = await _axios.get(
      `/api/accounts/fetch/?token=${credentials}`
    );
    return data;
  }
  if (type === "id") {
    const { data } = await _axios.get(
      `/api/accounts/fetch/?accountId=${credentials}`
    );
    return data;
  }
};

export default fetchUserData;
