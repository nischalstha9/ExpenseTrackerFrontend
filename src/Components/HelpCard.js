import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { parseDate } from "./Utils";
import DonationLikeShareAction from "./DonationLikeShareAction";
import { host } from "../AxiosInstance";

export default function HelpCard({ help, newState = false }) {
  return (
    <Card
      sx={{
        background: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* <CardMedia
        component="img"
        image="https://www.researchgate.net/publication/343504533/figure/fig4/AS:962816924188675@1606564851537/The-forest-green-lizard-Calotes-calotes-is-large-among-the-lizard-species-measuring_Q640.jpg"
        alt="green iguana"
      /> */}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: green[500] }}
            aria-label={help.doner.first_name || help.doner.email}
            src={host + help.doner.avatar_path}
          ></Avatar>
        }
        title={help.title}
        subheader={
          newState ? new Date().toDateString() : parseDate(help.created_at)
        }
      />
      <CardActions disableSpacing>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DonationLikeShareAction help={help} newState={newState} />
          <Grid>
            <Button
              size="small"
              color="secondary"
              component={Link}
              to={`/help-detail/${help.slug}`}
              variant="outlined"
            >
              View
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
