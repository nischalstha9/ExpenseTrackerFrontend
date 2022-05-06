import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CategoriesDropdown({
  activeQuery = "",
  setActiveFilter,
}) {
  const [active, setActive] = React.useState(activeQuery);

  function filter_active(query) {
    setActive(query);
    setActiveFilter(query);
  }

  const handleChange = (event) => {
    filter_active(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="activeLabel">Active</InputLabel>
        <Select
          labelId="activeLabel"
          id="active"
          label="Active"
          value={active}
          onChange={handleChange}
        >
          <MenuItem value={""}>All</MenuItem>;
          <MenuItem value={true}>Active</MenuItem>;
          <MenuItem value={false}>Inactive</MenuItem>;
        </Select>
      </FormControl>
    </Box>
  );
}
