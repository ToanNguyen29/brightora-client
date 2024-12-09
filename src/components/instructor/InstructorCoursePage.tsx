import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CourseOfInstructor from "./CoursesOfInstructor";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const InstructorCoursePage = () => {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
  const textColor = mode === "dark" ? "#000000" : "#ffffff";

  // State for filter and menu handling
  const [filter, setFilter] = useState("All");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (status: string) => {
    setFilter(status);
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily="monospace"
        sx={{ mb: 3 }}
      >
        {t("courses")}
      </Typography>

      <Button
        variant="outlined"
        component={Link}
        to="/instructor/course/create"
        sx={{
          height: "40px",
          fontSize: "16px",
          backgroundColor: backgroundColor,
          color: textColor,
          fontWeight: "bold",
          borderColor: backgroundColor,
          ":hover": {
            backgroundColor: textColor,
            color: backgroundColor,
          },
        }}
      >
        {t("add_new_course")}
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mt: 7 }}>
          <TextField
            variant="outlined"
            placeholder={t("search_your_courses")}
            size="small"
            sx={{ width: "300px" }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <ManageSearchIcon />
                </IconButton>
              ),
            }}
          />
          {/* Filter Button */}
          <Button
            variant="outlined"
            onClick={handleMenuOpen}
            sx={{
              height: "40px",
              color: backgroundColor,
              border: "1px solid",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: backgroundColor,
                color: textColor,
              },
            }}
          >
            {filter} ▼
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={() => setAnchorEl(null)}
          >
            {["All", "Draft", "Pending", "Published", "Rejected"].map(
              (status) => (
                <MenuItem key={status} onClick={() => handleMenuClose(status)}>
                  {status}
                </MenuItem>
              )
            )}
          </Menu>
        </Box>
      </Box>
      <CourseOfInstructor status={filter !== "All" ? filter : undefined} />
    </Box>
  );
};

export default InstructorCoursePage;
