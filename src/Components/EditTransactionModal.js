import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AxiosInstance from "../AxiosInstance";
import { useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";

export default function EditTransactionModal({
  account_book,
  trans_id,
  description,
  amount,
  refreshForm,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    formik.handleReset();
    setOpen(false);
  };
  const HandleDelete = () => {
    AxiosInstance.delete(
      `expensetracker/account-books/${account_book}/transactions/${trans_id}/`,
      {
        withCredentials: true,
      }
    )
      .then((resp) => {
        handleClose();
        refreshForm();
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: { description: description, amount: amount },
    onSubmit: (values) => {
      AxiosInstance.patch(
        `expensetracker/account-books/${account_book}/transactions/${trans_id}/`,
        values,
        {
          withCredentials: true,
        }
      )
        .then((resp) => {
          console.log(resp);
          handleClose();
          refreshForm();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div>
      <Button disableElevation onClick={handleClickOpen} color="black">
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>
        <form action="" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Description"
            />
            <TextField
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={HandleDelete} color="primary">
              Delete
            </Button>
            <Button onClick={formik.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
