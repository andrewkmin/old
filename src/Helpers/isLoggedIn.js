import _axios from "./_axios";

const isLoggedIn = async () => {
  if (!("token" in localStorage)) {
    return false;
  } else {
    const token = localStorage.getItem("token");
    const { data } = await _axios.get(`/auth/verify/?token=${token}`);
    if (!data.error) return true;
    else return false;
  }
};

export default isLoggedIn;
