import React from "react";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Container,
  LinearProgress,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { parseDate } from "./Utils";
import { host } from "../AxiosInstance";
const MostLikedHelps = () => {
  const [loading, setLoading] = React.useState(true);
  const mostLikedHelps = useSelector(
    (state) => state.home_meta.most_liked_donations
  );
  React.useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <Container component="main" sx={{ padding: "0", marginY: 10 }}>
      <LinearProgress />
    </Container>
  ) : (
    <Paper
      sx={{
        marginY: 0,
        padding: 1,
      }}
    >
      <Typography variant="h5" align="center">
        Most Liked Helps
      </Typography>
      <Divider />
      <List
        sx={{
          bgcolor: "background.paper",
        }}
      >
        {mostLikedHelps &&
          mostLikedHelps.length > 0 &&
          mostLikedHelps.map((donation) => {
            return (
              <>
                <ListItem
                  alignItems="flex-start"
                  component={Link}
                  to={`/help-detail/${donation.slug}`}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`${donation.doner.first_name} ${donation.doner.last_name}`}
                      src={host + donation.doner.avatar_path}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={donation.title}
                    secondary={
                      <React.Fragment
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {donation.likes.length} Likes |{" "}
                        </Typography>
                        - {parseDate(donation.updated_at)}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
      </List>
    </Paper>
  );
};

export default MostLikedHelps;
