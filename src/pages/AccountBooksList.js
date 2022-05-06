import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AccountBookCard from "../Components/AccountBookCard";
import HelpFilter from "../Components/HelpFilter";
import AxiosInstance from "../AxiosInstance";
import CustomPagination from "../Components/CustomPagination";
import CreateNewAccountBook from "../Components/CreateNewAccountBook";
import { HELP_PAGINATION_ITEM_LIMIT } from "../redux/constants";
import { Helmet } from "react-helmet";
import MostLikedHelps from "../Components/MostLikedHelps";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { insert_user_books } from "../redux/action";

const HelpsList = () => {
  const dispatch = useDispatch();
  const [accountBooks, setAccountBooks] = React.useState(
    useSelector((state) => state.user_books || [])
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dataCount, setDataCount] = React.useState(0);
  const limit = HELP_PAGINATION_ITEM_LIMIT;
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    window.scroll(0, 500);
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(
      `/expensetracker/account-books/?search=${searchQuery}&limit=${limit}&offset=${
        page * limit
      }&ordering=-created_at`
    )
      .then((resp) => {
        dispatch(insert_user_books(resp.data.results));
        setAccountBooks(resp.data.results);
        setDataCount(resp.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery, limit, page]);

  return (
    <>
      <Helmet>
        <title>My Account Books</title>
      </Helmet>
      <Container
        sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
      >
        <Typography variant="h3" sx={{ marginBottom: "2vh" }} align="center">
          {searchQuery !== ""
            ? `Search Results for "${searchQuery}"`
            : "My Account Books"}
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            sx={{
              marginY: 1,
              display: "flex",
              alignContent: "flex-start",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginY: 1 }}>
              <Grid
                sx={{
                  background: "white",
                  padding: "13px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
                xs={12}
                sm={12}
                spacing={2}
              >
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    textAlign: "justify",
                    textJustify: "inter-word",
                    paddingBottom: "8px",
                  }}
                >
                  Filter Your Search
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Grid item>
                    <TextField
                      id="search"
                      label="Search Account Book Title"
                      variant="outlined"
                      fullWidth
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            spacing={2}
            sx={{ marginY: 1, height: "min-content" }}
          >
            {loading ? (
              <Container
                component="main"
                sx={{ paddingY: 0, paddingX: 2, marginY: 10 }}
              >
                <LinearProgress />
              </Container>
            ) : (
              <>
                <Grid
                  container
                  item
                  xs={12}
                  lg={12}
                  spacing={2}
                  sx={{ marginY: 1, height: "min-content" }}
                >
                  {accountBooks.map((accountBook) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={4}
                        key={accountBook.id}
                      >
                        <AccountBookCard accountBook={accountBook} />
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginY: 1 }}>
                  <CustomPagination
                    dataCount={dataCount}
                    rowsPerPage={limit}
                    page={page}
                    handleChangePage={handleChangePage}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            sx={{
              marginY: 2,
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              paddingY: 0,
            }}
          >
            <CreateNewAccountBook />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelpsList;
