import React from "react";
import { Box } from "@mui/material";
import Review from "./featuredreview/Review";

const fakeData = {
   name: "David K",
   courses: 51,
   reviews: 36,
   avt: "",
   rating: 3.6,
   time: "3 years ago",
   content:
      "Angela is a great teacher and I have taken some other courses of hers. This one seems to be of the same great quality. If you want a simple code-along, this is not for you. Angela will Challenge you to actually use what she teaches you many times along the way. You WILL know how to program Python when you finish this course!",
};
const FeaturedReview: React.FC = () => {
   return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
         <Review data={fakeData} />
      </Box>
   );
};

export default FeaturedReview;
