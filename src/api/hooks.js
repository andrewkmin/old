import _axios from "./_axios";
import { useQuery } from "react-query";

// For logging out
export const useLogout = () => {
  const Logout = async () => {
    const { data } = await _axios.post("/auth/logout");
    return data;
  };
  return useQuery("logout", Logout);
};

export const useAuth = () => {
  const Authenticate = async () => {
    try {
      const data = await _axios.get("/auth/verify");
      if (data.hasOwnProperty("error")) return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return useQuery("authenticate", Authenticate);
};

// For fetching user data
export const useFetchUserData = (accountId) => {
  const FetchData = async () => {
    const { data: _status } = await _axios.get(
      `/api/network/status/?accountId=${accountId}`
    );
    const { data: _data } = await _axios.get(
      `/api/accounts/fetch/${accountId && `?accountId=${accountId}`}`
    );
    return { userData: _data, status: _status };
  };

  return useQuery("userData", FetchData);
};
