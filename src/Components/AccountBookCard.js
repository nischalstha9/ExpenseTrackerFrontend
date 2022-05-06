import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function HelpCard({ accountBook }) {
  return (
    <Card
      sx={{
        color: "white",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        height: "100%",
        backgroundSize: "250%",
        transition: "0.6s",
        backgroundImage:
          "linear-gradient(45deg, rgba(46,60,232,1) 0%, rgba(71,140,232,1) 39%, rgba(95,225,255,1) 100%)",
        "&:hover": {
          backgroundPosition: "right",
        },
      }}
    >
      <CardHeader title={accountBook.title} />
      <CardActions disableSpacing>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid>
            <Typography variant="body" sx={{ px: 1 }}>
              Rs. {accountBook.balance}/-
            </Typography>
          </Grid>
          <Grid>
            <Button
              size="small"
              color="secondary"
              component={Link}
              to={`/account-detail/${accountBook.id}`}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(46,60,232,1)",
                },
              }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
