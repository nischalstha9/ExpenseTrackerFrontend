import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const parseDate = (isoTime) => {
  return new Date(Date.parse(isoTime)).toDateString();
};

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const GetCategoryNameFromID = (id) => {
  const categories = useSelector((state) => state.categories);
  return (
    categories.filter((category) => {
      return category.id === id;
    })[0] || null
  );
};

export const isUserCustomer = (user) => {
  return user.role == 2;
};
