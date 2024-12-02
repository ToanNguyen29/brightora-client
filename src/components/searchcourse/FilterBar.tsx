import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Checkbox,
} from "@mui/material";

enum Type {
  PROGRAMMING = "Programming",
  DATA_SCIENCE = "Data Science",
  WEB_DEVELOPMENT = "Web Development",
  CYBER_SECURITY = "Cyber Security",
  CLOUD_COMPUTING = "Cloud Computing",
  MACHINE_LEARNING = "Machine Learning",
  DATABASE_ADMINISTRATION = "Database Administration",
  DEVOPS = "DevOps",
  IT_SUPPORT = "IT Support",
  NETWORKING = "Networking",
  SOFTWARE_ENGINEERING = "Software Engineering",
  ARTIFICIAL_INTELLIGENCE = "Artificial Intelligence",
}

interface FilterSidebarProps {
  setFilter: (filter: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ setFilter }) => {
  const [level, setLevel] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [discountOnly, setDiscountOnly] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Type | string>("");

  const handleDiscountToggle = () => {
    setDiscountOnly(!discountOnly);
  };
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as Type;
    setSelectedCategory((prev) => (prev === value ? "" : value)); // Toggle category selection
  };
  const handleFilterClick = () => {
    const filters: { [key: string]: string | boolean } = {};

    if (level) {
      filters.level = level;
    }
    if (price) {
      filters.price_type = price;
    }
    if (discountOnly) {
      filters.discount = "true";
    }
    if (selectedCategory) {
      filters.category = selectedCategory;
    }

    const queryString = Object.entries(filters)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    console.log("queryString", queryString);
    setFilter(queryString);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        color: "black",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Filter
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Category
      </Typography>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        fullWidth
        displayEmpty
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: 1,
          marginBottom: 2,
        }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {Object.values(Type).map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Level
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        {[
          { label: "All Levels", value: "All Levels" },
          { label: "Beginner", value: "Beginner Level" },
          { label: "Intermediate", value: "Intermediate" },
          { label: "Expert", value: "Expert Level" },
        ].map((option) => (
          <Button
            key={option.value}
            variant={level === option.value ? "contained" : "outlined"}
            onClick={() =>
              setLevel((prev) => (prev === option.value ? "" : option.value))
            }
            sx={{
              margin: "0.5rem",
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: level === option.value ? "black" : "white",
              color: level === option.value ? "white" : "black",
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Price
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        {[
          { label: "Paid", value: "paid" },
          { label: "Free", value: "free" },
        ].map((option) => (
          <Button
            key={option.value}
            variant={price === option.value ? "contained" : "outlined"}
            onClick={() =>
              setPrice((prev) => (prev === option.value ? "" : option.value))
            }
            sx={{
              margin: "0.5rem",
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: price === option.value ? "black" : "white",
              color: price === option.value ? "white" : "black",
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Discount
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={discountOnly}
            onChange={handleDiscountToggle}
            sx={{ color: "black" }}
          />
        }
        label="Show Discounted Only"
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleFilterClick}
        sx={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
          borderRadius: 1,
          ":hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;
