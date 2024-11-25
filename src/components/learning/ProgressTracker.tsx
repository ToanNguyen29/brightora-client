// ProgressTracker.tsx
import React from 'react';
import { Box, Typography } from "@mui/material";

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => (
  <Box display="flex" justifyContent="space-between" mt={2}>
    <Typography variant="h6">Course Progress</Typography>
    <Typography variant="body1">{progress.toFixed(0)}% completed</Typography>
  </Box>
);

export default ProgressTracker;
