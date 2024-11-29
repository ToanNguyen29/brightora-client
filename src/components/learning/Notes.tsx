// QuesAndAns.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface Note {
  id: string;
  text: string;
}

interface QuesAndAnsProps {
  notes: Note[];
  newNote: string;
  setNewNote: React.Dispatch<React.SetStateAction<string>>;
  handleAddNote: () => void;
}

const QuesAndAns: React.FC = () => (
  <Box p={3}>
    <Typography variant="h6" gutterBottom>
      Question and Answer
    </Typography>
  </Box>
);

export default QuesAndAns;
