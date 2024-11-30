import { Box } from "@mui/material";
import { ICourseInfoPage } from "../../models/Course";
import CourseHeader from "../course/Header";
import Instructor from "../course/Instructor";

import Description from "../course/Description";

interface OverviewProps {
  course: ICourseInfoPage | undefined;
}

const Overview: React.FC<OverviewProps> = ({ course }) => {
  console.log("course in overview", course); // Moved outside JSX

  return (
    <Box p={3}>
      <CourseHeader
        title={course?.title || ""}
        subtitle={course?.subtitle || ""}
        rating={course?.review.average_rating || 0}
        numberRating={course?.review.total_reviews || 0}
        students={100}
        owner={course?.owner || undefined}
        lastUpdated={course?.updated_at || ""}
        lang={course?.language || []}
      />
      <Description description={course?.description || ""} />
      <Instructor owner_id={course?.owner._id || ""} />
    </Box>
  );
};

export default Overview;
