import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useThemeContext } from "../../theme/ThemeContext";
import { Link } from "react-router-dom";

const InstructorCoursePage = () => {
   const { mode } = useThemeContext();

   const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
   const textColor = mode === "dark" ? "#000000" : "#ffffff";

   return (
      <Box ml={4}>
         <Typography variant="h3" fontFamily={"monospace"}>
            Courses
         </Typography>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               mt: 2,
            }}
         >
            <TextField
               sx={{
                  height: "40px", // Set height
                  "& .MuiInputBase-root": {
                     height: "100%",
                  },
                  fontSize: "16px",
               }}
            />
            <Button
               sx={{
                  height: "40px", // Matches the height of the TextField
                  fontSize: "16px",
                  backgroundColor: backgroundColor,
                  color: textColor,
                  fontWeight: "bold",
                  ":hover": {
                     backgroundColor: backgroundColor,
                  },
                  width: "100px",
               }}
            >
               {" "}
               <SearchIcon />
            </Button>
         </Box>
         <Button
            component={Link}
            to="/instructor/course/create"
            sx={{
               height: "40px", // Matches the height of the TextField
               fontSize: "16px",
               backgroundColor: backgroundColor,
               color: textColor,
               fontWeight: "bold",
               ":hover": {
                  backgroundColor: backgroundColor,
               },
               border: "1px solid",
               mt: 5,
               padding: "10px 20px",
            }}
         >
            Add new course
         </Button>
      </Box>
   );
};

export default InstructorCoursePage;
