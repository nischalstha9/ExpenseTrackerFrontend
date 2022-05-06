import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
const MostLikedDonations = () => {
  const categories = useSelector((state) => state.categories);
  return (
    <List dense>
      {categories &&
        categories.length > 0 &&
        categories.map((category) => {
          return (
            <ListItem
              key={category.id}
              button
              to="/categories"
              component={Link}
            >
              <ListItemText
                primary={category.name}
                secondary={`Donations available: ${category.num_donations}`}
              />
            </ListItem>
          );
        })}
    </List>
  );
};

export default MostLikedDonations;
