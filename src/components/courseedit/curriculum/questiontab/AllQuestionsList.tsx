import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { MultipleChoiceQuestion } from "../../../../models/Course";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
interface QuestionsListProps {
   data: MultipleChoiceQuestion[];
   onEdit: (item: MultipleChoiceQuestion, index: number) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({ data, onEdit }) => {
   const { t } = useTranslation();

   return (
      <Box>
         {data.map((item, index) => (
            <Box
               key={index}
               width="100%"
               p={2}
               border="1px solid"
               mt={1}
               display="flex"
               flexDirection="row"
               alignItems="center"
               justifyContent="space-between"
            >
               <Typography fontWeight={"bold"}>
                  {t("question")} {index + 1} : {item.question_text}
               </Typography>
               <Box>
                  <IconButton onClick={() => onEdit(item, index)}>
                     <EditIcon />
                  </IconButton>

                  <IconButton onClick={() => onEdit(item, index)}>
                     <DeleteIcon />
                  </IconButton>
               </Box>
            </Box>
         ))}
      </Box>
   );
};

export default QuestionsList;
