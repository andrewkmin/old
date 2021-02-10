import _axios from "./_axios";
import { useQuery } from "react-query";

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

export const useLogout = () => {
  const Logout = async () => {
    const { data } = await _axios.post("/auth/logout");
    return data;
  };
  return useQuery("logout", Logout);
};
