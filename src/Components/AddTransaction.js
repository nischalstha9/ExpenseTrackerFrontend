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
import Fab from "@mui/material/Fab";
import { Add as AddIcon } from "@mui/icons-material";
import { green } from "@mui/material/colors";

export default function AddTransactionModal({
  account_book,
  _type,
  refreshForm,
  bottomOffset,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    formik.handleReset();
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: { description: "", amount: 0, _type: _type },
    onSubmit: (values) => {
      AxiosInstance.post(
        `expensetracker/account-books/${account_book}/transactions/`,
        values,
        {
          withCredentials: true,
        }
      )
        .then((resp) => {
          handleClose();
          refreshForm();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: bottomOffset || 20,
          left: "auto",
          position: "fixed",
        }}
        variant="extended"
        onClick={handleClickOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        {_type === "DEBIT" ? "Income" : "Expense"}
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add {_type === "DEBIT" ? "Income" : "Expense"} Transaction
        </DialogTitle>
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
            <Button onClick={formik.handleSubmit} color="primary">
              {_type === "DEBIT" ? "Add Income" : "Add Expense"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
