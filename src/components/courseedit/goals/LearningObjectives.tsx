import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface colorProps {
  backgroundColor: string;
  textColor: string;
  name: string;
  value: string[];
  handleChange: (name: string, value: string[]) => void;
}

const LearningObjectives: React.FC<colorProps> = ({
  backgroundColor,
  textColor,
  value,
  name,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleAddField = () => {
    handleChange(name, [...value, ""]);
  };

  const handleInputChange = (index: number, valueUpdate: string) => {
    const updatedObjectives = [...value]; // Tạo bản sao để tránh thay đổi trực tiếp
    updatedObjectives[index] = valueUpdate;
    handleChange(name, updatedObjectives);
  };

  const handleDeleteField = (index: number) => {
    const updatedObjectives = [...value];
    updatedObjectives.splice(index, 1); // Xóa phần tử tại vị trí `index`
    handleChange(name, updatedObjectives);
  };

  const commonTextFieldStyles = {
    width: "60%",
    mt: "20px",
    borderRadius: 5,
    fontSize: "20px",
  };

  return (
    <Box
      mx={"20px"}
      display={"flex"}
      flexDirection={"column"}
      mt={5}
      maxWidth={"90%"}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        {t("create_course.what_learn")}
      </Typography>
      <Typography variant="h6">{t("course.help_enter")}</Typography>

      {value.map((objective, index) => (
        <Box
          key={index}
          display={"flex"}
          alignItems={"center"}
          //  justifyContent={"space-between"}
          sx={{ width: "100%", mt: "20px" }}
        >
          <TextField
            value={objective}
            onChange={(e) => handleInputChange(index, e.target.value)}
            label={t("create_course.enter_objective")}
            sx={commonTextFieldStyles}
            variant="outlined"
          />
          <IconButton
            onClick={() => handleDeleteField(index)}
            sx={{ ml: 0.5, color: textColor }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        onClick={handleAddField}
        sx={{
          width: "fit-content",
          mt: "20px",
          backgroundColor: backgroundColor,
          color: textColor,
          "&:hover": {
            backgroundColor: backgroundColor,
          },
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        {t("add_more")}
      </Button>
    </Box>
  );
};

export default LearningObjectives;
