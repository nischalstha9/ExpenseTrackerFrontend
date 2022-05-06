import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function CategoriesDropdown({
  categoryValue = "",
  setCategoryFilter,
}) {
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = React.useState(categoryValue);

  function filter_by_category(query) {
    setCategory(query);
    setCategoryFilter(query);
  }

  const handleChange = (event) => {
    filter_by_category(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="categoryLabel">Category</InputLabel>
        <Select
          labelId="categoryLabel"
          id="category"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={""}>All Categories</MenuItem>;
          {categories &&
            categories.map((category) => {
              return (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
