import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import { IDocument } from "../../../../models/Course";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

interface DocumentListProps {
  data: IDocument[];
  onEdit: (item: IDocument, index: number) => void;
  onDelete: (index: number) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
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
            {t("document")} {index + 1} : {item.title}
          </Typography>
          <Box>
            {item.file_url && (
              <IconButton onClick={() => window.open(item.file_url, "_blank")}>
                <OpenInNewIcon />
              </IconButton>
            )}

            <IconButton onClick={() => onEdit(item, index)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => onDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DocumentList;
