import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import DonationLikeShareAction from "../Components/DonationLikeShareAction";

const RenderTemplate = ({
  title,
  avatar_path,
  description,
  date,
  contact,
  location,
}) => {
  return (
    <Card
      sx={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex end",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image="https://www.researchgate.net/publication/343504533/figure/fig4/AS:962816924188675@1606564851537/The-forest-green-lizard-Calotes-calotes-is-large-among-the-lizard-species-measuring_Q640.jpg"
        alt="green iguana"
      />
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: green[500] }}
            aria-label="recipe"
            src={avatar_path}
          ></Avatar>
        }
        title={title}
        subheader={new Date().toDateString()}
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
          <DonationLikeShareAction help={{}} newState={true} />
          <Grid>
            <Button size="small" color="primary" component={Link} to={`#`}>
              Read More
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RenderTemplate;
