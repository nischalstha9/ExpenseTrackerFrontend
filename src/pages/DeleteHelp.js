import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AxiosInstance from "../AxiosInstance";
import Paper from "@mui/material/Paper";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NoPermission from "../Components/NoPermission";

export default function Login() {
  const history = useHistory();
  const { help_slug } = useParams();
  const user = useSelector((state) => state.user);
  const [isOwner, setIsOwner] = useState(false);
  const [title, setTitle] = useState("Delete Help");
  const [help, setHelp] = useState({});
  const [loading, setLoading] = useState(true);

  const url = `donation/donation/${help_slug}`;

  const handleDelete = (e) => {
    e.preventDefault();
    AxiosInstance.delete(url)
      .then((resp) => {
        toast.error("Help Deleted!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        history.push("/my-helps");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Error Deleting Help!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  const getFormData = () => {
    AxiosInstance.get(url)
      .then((resp) => {
        let _help = resp.data;
        setTitle(`Delete ${_help.title}`);
        setHelp(_help);
        setIsOwner(_help.doner.id == user.id);
      })
      .catch((err) => console.log(err.response))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (help_slug !== undefined) {
      getFormData();
    }
  }, []);

  return loading ? (
    <Container component="main" sx={{ padding: "0", marginY: 10 }}>
      <LinearProgress />
    </Container>
  ) : isOwner ? (
    <Container component="main" maxWidth="sm" sx={{ marginTop: "15vh" }}>
      <Helmet>
        <title>Sharing is Caring | Login</title>
      </Helmet>
      <Paper
        sx={{
          padding: "1vh 2vw",
          border: "5px solid",
          borderColor: "danger.main",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Delete Help</Typography>
          <Typography
            variant="body1"
            sx={{
              paddingY: 3,
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Are you sure you want to delete help "{help.title}"?
          </Typography>
          <Typography variant="body2" color="error">
            This action is irreversible.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              disableElevation
              sx={{ mt: 3, mb: 2, color: "white" }}
              component={Link}
              to={`/help-detail/${help.slug}`}
            >
              Go Back
            </Button>
          </Box>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Confirm Delete
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  ) : (
    <NoPermission />
  );
}
