import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";

const DonationLikeShareAction = ({ help, newState = false }) => {
  const userId = useSelector((state) => state.user.id);
  const [liked, setLiked] = React.useState(
    newState ? true : Boolean(userId) && help.likes.includes(userId)
  );
  const [likeCount, setLikeCount] = React.useState(
    newState ? 5 : help.likes.length
  );
  const changeLikeState = () => {
    AxiosInstance.post(`donation/donation/${help.id}/like/`).then((resp) => {
      liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
      setLiked(!liked);
    });
  };
  return (
    <Grid>
      {/* <Typography sx={{ display: "inline" }}>
        {likeCount > 1 ? likeCount : ""}
      </Typography> */}
      <IconButton
        aria-label="like"
        onClick={changeLikeState}
        disabled={!Boolean(userId)}
      >
        {liked ? (
          <FavoriteIcon
            sx={{ color: liked ? "likeBtn.liked" : "" }}
          ></FavoriteIcon>
        ) : (
          <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
        )}
      </IconButton>
      <IconButton
        aria-label="share"
        onClick={() => {
          navigator.clipboard.writeText(
            window.location.host + "/help-detail/" + help.slug
          );
          toast.info("Link copied to clipboard", { autoClose: 1000 });
        }}
      >
        <ShareIcon />
      </IconButton>
    </Grid>
  );
};

export default DonationLikeShareAction;
