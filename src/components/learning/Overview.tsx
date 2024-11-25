import { Box, Typography } from "@mui/material";

const Overview: React.FC = () => (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>About this Course</Typography>
      <Typography>
        This course introduces the basics of React, components, props, state, and more for beginners.
      </Typography>
      <Typography variant="h6" mt={3} fontWeight="bold">Features</Typography>
      <ul>
        <li>Lifetime access to course materials</li>
        <li>Certificate of completion</li>
        <li>In-depth lessons on React fundamentals</li>
      </ul>
    </Box>
  );

export default Overview