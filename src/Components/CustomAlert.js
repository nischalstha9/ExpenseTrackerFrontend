import { React, useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const CustomAlert = ({
  message = "You can pass message, severity and openState!",
  severity = "success",
  openState = true,
}) => {
  const [alertOpen, setAlertOpen] = useState(openState);

  return (
    <Collapse in={alertOpen}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlertOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity={severity}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
