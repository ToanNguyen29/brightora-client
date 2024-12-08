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

const Requirements: React.FC<colorProps> = ({
  backgroundColor,
  textColor,
  value,
  name,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleAddRequirement = () => {
    handleChange(name, [...value, ""]);
  };

  const handleRequirementChange = (index: number, valueUpdate: string) => {
    const updatedRequirements = [...value]; // Tạo bản sao để tránh thay đổi trực tiếp
    updatedRequirements[index] = valueUpdate;
    handleChange(name, updatedRequirements);
  };

  const handleDeleteField = (index: number) => {
    const updatedRequirements = [...value];
    updatedRequirements.splice(index, 1); // Xóa phần tử tại vị trí `index`
    handleChange(name, updatedRequirements);
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
        {t("course.requirements")}
      </Typography>
      <Typography variant="h6">{t("course.req_skills")}</Typography>

      {value.map((requirement, index) => (
        <Box
          key={index}
          display={"flex"}
          alignItems={"center"}
          sx={{ width: "100%", mt: "20px" }}
        >
          <TextField
            value={requirement}
            onChange={(e) => handleRequirementChange(index, e.target.value)}
            label={t("example.no_program_need")}
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
        onClick={handleAddRequirement}
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

export default Requirements;
