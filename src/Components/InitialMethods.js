import AxiosInstance from "../AxiosInstance";

export const fetchUser = async () => {
  let user;
  let resp = await AxiosInstance.get("auth/user/");
  user = await resp.data.json;
  return user;
};

export const fetchDonationMeta = async () => {
  let meta_data = {};
  let resp = await AxiosInstance.get("donation/home-meta/");
  meta_data = await resp.data.json;
  return meta_data;
};
