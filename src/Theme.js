import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2496ed", //#2496ed
    },
    secondary: {
      main: "#2294ea", //80c4a2
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    danger: {
      main: "#ff0a0a",
    },
    likeBtn: {
      main: "#456dfa",
      liked: "#456dfa",
    },
    black: {
      main: "#000",
    },
    avatar: {
      main: "#cea521", //#2496ed
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: "small",
    },
    MuiAppBar: {
      color: "default",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default Theme;
