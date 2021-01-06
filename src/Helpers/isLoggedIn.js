import _axios from "./_axios";

const isLoggedIn = async () => {
  if (!("token" in localStorage)) {
    return false;
  } else {
    const token = localStorage.getItem("token");
    const { data } = await _axios.get(`/auth/verify/?token=${token}`);
    return data.isLegit;
  }
};

export default isLoggedIn;
