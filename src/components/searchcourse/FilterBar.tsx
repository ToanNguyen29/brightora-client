import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";

const FilterSidebar = () => {
  // State for filters
  const [ratings, setRatings] = useState("");
  const [levels, setLevels] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);

  // Handle change for Ratings
  const handleRatingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatings(event.target.value);
  };

  // Handle change for Level
  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setLevels((prev) =>
      prev.includes(value)
        ? prev.filter((level) => level !== value)
        : [...prev, value]
    );
  };

  // Handle change for Price
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setPrice((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Ratings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={ratings} onChange={handleRatingsChange}>
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <FormControlLabel
                key={rating}
                value={rating.toString()}
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <StarIcon
                          key={index}
                          sx={{
                            fontSize: 20,
                            color:
                              index < Math.floor(rating) ? "#FFD700" : "#ccc",
                          }}
                        />
                      ))}
                    <Typography
                      sx={{ ml: 1, fontSize: "0.9rem" }}
                    >{`${rating} & up (10,000)`}</Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      {/* Level Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Level
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {[
              { label: "All Levels", value: "all" },
              { label: "Beginner", value: "beginner" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Expert", value: "expert" },
            ].map((level) => (
              <FormControlLabel
                key={level.value}
                control={
                  <Checkbox
                    name={level.value}
                    checked={levels.includes(level.value)}
                    onChange={handleLevelChange}
                  />
                }
                label={`${level.label} (10,000)`}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {[
              { label: "Paid", value: "paid" },
              { label: "Free", value: "free" },
            ].map((priceOption) => (
              <FormControlLabel
                key={priceOption.value}
                control={
                  <Checkbox
                    name={priceOption.value}
                    checked={price.includes(priceOption.value)}
                    onChange={handlePriceChange}
                  />
                }
                label={`${priceOption.label} (10,000)`}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterSidebar;
