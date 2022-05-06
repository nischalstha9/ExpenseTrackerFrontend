import * as React from "react";
import Typography from "@mui/material/Typography";
import CategoriesDropdown from "../Components/CategoriesDropdown";
import ActiveDropdown from "../Components/ActiveDropdown";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  HELP_FILTER_HAS_SEARCH,
  HELP_FILTER_HAS_CATEGORY,
  HELP_FILTER_HAS_ACTIVE,
} from "../redux/constants";

export default function HelpFilter({
  setSearchQuery,
  setCategoryFilter,
  setActiveFilter,
  filtersList = [
    HELP_FILTER_HAS_SEARCH,
    HELP_FILTER_HAS_CATEGORY,
    HELP_FILTER_HAS_ACTIVE,
  ],
}) {
  const [sQuery, setSQuery] = React.useState("");
  function filter_by_search(e) {
    if (e.keyCode === 13) {
      setSearchQuery(e.target.value);
    }
  }
  return (
    <Grid
      sx={{
        background: "white",
        padding: "13px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        marginTop: "10px",
      }}
      // item
      // container
      xs={12}
      sm={12}
      spacing={2}
    >
      <Typography
        variant="h6"
        align="left"
        sx={{
          textAlign: "justify",
          textJustify: "inter-word",
          paddingBottom: "8px",
        }}
      >
        Filter Your Search
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {filtersList.includes(HELP_FILTER_HAS_SEARCH) ? (
          <Grid item>
            <TextField
              id="search"
              label="Search Help Title"
              variant="outlined"
              fullWidth
              value={sQuery}
              onChange={(e) => setSQuery(e.target.value)}
              onKeyUp={(e) => {
                filter_by_search(e);
              }}
            />
          </Grid>
        ) : (
          ""
        )}
        {filtersList.includes(HELP_FILTER_HAS_CATEGORY) ? (
          <Grid item>
            <CategoriesDropdown setCategoryFilter={setCategoryFilter} />
          </Grid>
        ) : (
          ""
        )}
        {filtersList.includes(HELP_FILTER_HAS_ACTIVE) ? (
          <Grid item>
            <ActiveDropdown setActiveFilter={setActiveFilter} />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
}
