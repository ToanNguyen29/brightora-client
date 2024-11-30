import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Paper,
} from "@mui/material";

import ReactMarkdown from "react-markdown";

interface IQAndA {
  _id: string;
  question: string;
  answer: string | null;
  student: {
    first_name: string;
    last_name: string;
    photo: string;
  };
}

interface QAItemProps {
  qAndA: IQAndA;
}

const QAItem: React.FC<QAItemProps> = ({ qAndA }) => {
  const MAX_LENGTH = 150;

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        border: "2px solid", // Solid border
        borderColor: "grey.300", // Border color from the theme
        overflow: "hidden", // Ensures border-radius applies properly
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Elevated shadow on hover
        },
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        {/* Student Information */}
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={qAndA.student.photo}
            alt={qAndA.student.first_name}
            sx={{
              width: 48,
              height: 48,
              border: "4px solid",
              borderColor: "primary.main",
            }}
          />
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {qAndA.student.first_name} {qAndA.student.last_name}
            </Typography>
          </Box>
        </Box>
        {/* Question */}
        <ReactMarkdown>
          {qAndA.question.length > MAX_LENGTH
            ? `${qAndA.question.slice(0, MAX_LENGTH)}...`
            : qAndA.question}
        </ReactMarkdown>

        <Divider sx={{ my: 2 }} />
        {/* Answer Section */}
        {qAndA.answer && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.300",
              backgroundColor: "grey.100",
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar
                src={qAndA.instructor?.photo} // Fixed instructor photo reference
                alt="Instructor"
                sx={{
                  width: 36,
                  height: 36,
                  mr: 2,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              />
              <Typography variant="subtitle1" fontWeight="bold">
                Toan Nguyen
              </Typography>
            </Box>
            <ReactMarkdown>{qAndA.answer}</ReactMarkdown>
          </Paper>
        )}
        {/* Reply Section */}
      </CardContent>
    </Card>
  );
};

export default QAItem;
