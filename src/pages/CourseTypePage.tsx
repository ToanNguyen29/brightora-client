import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NewCourse from "../components/courseviewing/NewCourse";
import PopularCourse from "../components/courseviewing/PopularCourse";

const CourseTypePage: React.FC = () => {
   const { type } = useParams();
   console.log("type", type);

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            px: "20%",
         }}
      >
         <Typography variant="h2" fontWeight="bold">
            {type?.toUpperCase()}
         </Typography>
         <NewCourse type={type} />
         <PopularCourse type={type} />
      </Box>
   );
};

export default CourseTypePage;
