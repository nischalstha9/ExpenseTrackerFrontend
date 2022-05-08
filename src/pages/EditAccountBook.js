import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";

import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  Divider,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import NoPermission from "../Components/NoPermission";
import { Helmet } from "react-helmet";

export default function DeleteAccountBookModal() {
  const history = useHistory();
  const [accountBook, setAccountBook] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isPageLoading, setIsPageloading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  let { account_book_id } = useParams();

  useEffect(() => {
    AxiosInstance.get(`expensetracker/account-books/${account_book_id}/`, {
      withCredentials: true,
    })
      .then((resp) => {
        setAccountBook(resp.data);
        setIsOwner(true);
        setIsPageloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPageloading(false);
      });
  }, []);

  const UpdateForm = useFormik({
    initialValues: { title: accountBook.title },
    onSubmit: (values) => {
      AxiosInstance.patch(
        `expensetracker/account-books/${accountBook.id}/`,
        values,
        {
          withCredentials: true,
        }
      )
        .then((resp) => {
          toast.success("Account Book Updated Successfully!");
          history.push("/");
          setAccountBook(resp.data);
        })
        .catch((err) => console.log(err));
    },
  });

  const deleteForm = useFormik({
    initialValues: { password: "" },
    onSubmit: (values) => {
      console.log(values);
      AxiosInstance.delete(
        `expensetracker/account-books/${accountBook.id}/`,
        { data: values },
        {
          withCredentials: true,
        }
      )
        .then((resp) => {
          toast.success("Account Book Deleted!");
          history.push("/");
        })
        .catch((err) => {
          let msg = Object.entries(err.response.data)[0][1];
          toast.error(msg);
        });
    },
  });

  if (isPageLoading) {
    return <Loading />;
  } else if (!isOwner) {
    return <NoPermission />;
  } else {
    return (
      <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
        <Helmet>
          <title>Sharing is Caring | {`Edit ${accountBook.title}`}</title>
        </Helmet>
        <Paper
          sx={{
            padding: "1vh 2vw",
            border: "5px solid",
            borderColor: "primary.main",
          }}
        >
          <Typography variant="h4">
            Update Book "{accountBook.title}"
          </Typography>
          <Divider />
          <DialogTitle id="form-dialog-title">Title:</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              onChange={UpdateForm.handleChange}
              value={UpdateForm.values.title}
              placeholder="Title"
            />
            <Button
              variant="outlined"
              color="secondary"
              className="btn btn-warning mt-3"
              onClick={UpdateForm.handleSubmit}
            >
              Update
            </Button>
          </DialogContent>
          <Typography variant="h4">
            Delete Book "{accountBook.title}"
          </Typography>
          <Divider />
          <DialogTitle id="form-dialog-title">
            Confirm Delete Account Book: "{accountBook.title}"
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant="caption">
              Deleting Account Book will delete all of your transactions in
              respective account book. This action is irreversible. Enter your
              password to continue.
            </DialogContentText>
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={deleteForm.handleChange}
              value={deleteForm.values.password}
              placeholder="Your Password"
            />
            <DialogActions>
              <Button
                variant="outlined"
                color="danger"
                onClick={deleteForm.handleSubmit}
                className="btn btn-outline-danger"
              >
                Confirm Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Paper>
      </Container>
    );
  }
}
