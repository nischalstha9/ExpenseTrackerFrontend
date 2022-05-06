import AxiosInstance from "../AxiosInstance";
const fetchCategories = () => {
  let categories = [];
  AxiosInstance.get("donation/category/").then((resp) => {
    categories = resp.data;
  });
  return categories;
};

export default fetchCategories;
