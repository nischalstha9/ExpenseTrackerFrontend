import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormControl, Select, MenuItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AxiosInstance from "../AxiosInstance";
import { Helmet } from "react-helmet";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import TransactionTable from "../Components/TransactionTable";
import CustomTablePagination from "../Components/CustomTablePagination";
import AddTransaction from "../Components/AddTransaction";
import AccountBookPieChart from "../charts/AccountBookPieChart";

const AccountBookDetail = () => {
  const { account_book_id } = useParams();
  const [accountBook, setAccountBook] = React.useState({});
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataCount, setdataCount] = React.useState(0);
  const [refresher, setRefresher] = useState(0);

  const initialFilter = Object.freeze({
    type: "",
    sdate: "",
    edate: "",
    search: "",
  });
  const [filterForm, setFilterForm] = React.useState(initialFilter);
  const handleFormChange = (e) => {
    setPage(0);
    let value = e.target.value;
    if (e.target.name === "sdate" || e.target.name === "edate") {
      let date;
      try {
        date = new Date(value).toISOString();
      } catch {
        date = "";
      }
      setFilterForm({
        ...filterForm,
        [e.target.name]: date,
      });
    } else {
      setFilterForm({
        ...filterForm,
        [e.target.name]: value.trim(),
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(`/expensetracker/account-books/${account_book_id}/`)
      .then((resp) => {
        setAccountBook(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresher]);

  let url = `expensetracker/account-books/${account_book_id}/transactions/?limit=${rowsPerPage}&offset=${
    page * rowsPerPage
  }&_type=${filterForm.type}&search=${filterForm.search}&date__gte=${
    filterForm.sdate || ""
  }&date__lte=${filterForm.edate || ""}`;

  useEffect(() => {
    AxiosInstance.get(url)
      .then((resp) => {
        setTransactions(resp.data.results);
        setdataCount(resp.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresher, account_book_id, url]);

  const types = [
    { value: "", title: "All Transaction" },
    { value: "DEBIT", title: "Income" },
    { value: "CREDIT", title: "Expenses" },
  ];

  const getIncomes = () => {
    const incomes = transactions.filter((transaction) => {
      return transaction._type == "DEBIT";
    });
    return incomes;
  };
  const getExpenses = () => {
    const expenses = transactions.filter((transaction) => {
      return transaction._type == "CREDIT";
    });
    return expenses;
  };

  return (
    <>
      <Helmet>
        <title>Expense Tracker | {!loading ? accountBook.title : ""}</title>
      </Helmet>
      <Container
        sx={{ marginBottom: "25vh", marginTop: "4vh", minWidth: "90vw" }}
      >
        <Typography variant="h3" sx={{ marginBottom: "5px", fontWeight: 400 }}>
          {accountBook.title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            color: accountBook.balance >= 0 ? "green" : "red",
          }}
        >
          Rs. {accountBook.balance}/-
        </Typography>
        <Divider />
        <Grid container spacing={1}>
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
                      label="Search transactions"
                      variant="outlined"
                      name="search"
                      fullWidth
                      value={filterForm.search}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <label htmlFor="type">Start Date:</label>
                      <Select
                        variant="outlined"
                        id="type"
                        name="type"
                        type="text"
                        displayEmpty
                        value={filterForm.type}
                        onChange={handleFormChange}
                      >
                        {types.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <label htmlFor="sdate">Start Date:</label>
                      <TextField
                        type="date"
                        name="sdate"
                        variant="outlined"
                        onChange={(e) => {
                          handleFormChange(e);
                        }}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <label htmlFor="edate">End Date:</label>
                      <TextField
                        type="date"
                        name="edate"
                        variant="outlined"
                        onChange={(e) => {
                          handleFormChange(e);
                        }}
                      ></TextField>
                    </FormControl>
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
                  <Grid item xs={12} xl={12}>
                    <TransactionTable
                      transactions={transactions}
                      refreshForm={() => {
                        setRefresher(refresher + 1);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginY: 1 }}>
                  <CustomTablePagination
                    dataCount={dataCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid
            sx={{
              marginTop: "20px",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            xs={12}
            sm={12}
            md={3}
            lg={3}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                margin: 1,
                background: "white",
                borderRadius: "5px",
                padding: 1,
              }}
            >
              <Typography variant="h6">
                Summary of your selected data
              </Typography>
              <Divider />
              <Typography variant="p">Income VS Expenditure</Typography>
              {!loading && (
                <AccountBookPieChart
                  incomes={getIncomes()}
                  expenses={getExpenses()}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <AddTransaction
        account_book={account_book_id}
        _type="DEBIT"
        refreshForm={() => {
          setRefresher(refresher + 1);
        }}
        bottomOffset={20}
      />
      <AddTransaction
        account_book={account_book_id}
        _type="CREDIT"
        refreshForm={() => {
          setRefresher(refresher + 1);
        }}
        bottomOffset={80}
      />
    </>
  );
};

export default AccountBookDetail;
