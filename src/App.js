import { ThemeProvider } from "@mui/material";
import React from "react";
import Routes from "./routes/Routes";
import theme from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import {
  insert_user,
  log_in,
  set_home_meta,
  set_category,
} from "./redux/action";
import AxiosInstance from "./AxiosInstance";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  const setHomeMeta = () => {
    AxiosInstance.get("donation/home-meta/").then((resp) => {
      let new_meta = resp.data;
      dispatch(set_home_meta(new_meta));
      dispatch(set_category(new_meta.all_categories));
    });
  };
  // setHomeMeta();

  const setLoginState = async () => {
    if (!user) {
      AxiosInstance.get("auth/user/").then((resp) => {
        let new_user_data = resp.data;
        localStorage.setItem("user", JSON.stringify(new_user_data));
        dispatch(insert_user(new_user_data));
      });
    } else {
      dispatch(insert_user(user));
    }
    dispatch(log_in());
  };

  if (token) {
    setLoginState();
  }

  const isAuthenticated = useSelector((state) => state.authenticated);

  return (
    <ThemeProvider theme={theme}>
      <Routes isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
}

export default App;
