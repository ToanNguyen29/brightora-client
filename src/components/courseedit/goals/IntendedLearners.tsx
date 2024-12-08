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

const IntendedLearners: React.FC<colorProps> = ({
  backgroundColor,
  textColor,
  value,
  name,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleAddLearner = () => {
    handleChange(name, [...value, ""]);
  };

  const handleLearnerChange = (index: number, valueUpdate: string) => {
    const updatedLearners = [...value]; // Tạo bản sao để tránh thay đổi trực tiếp
    updatedLearners[index] = valueUpdate;
    handleChange(name, updatedLearners);
  };

  const handleDeleteField = (index: number) => {
    const updatedLearners = [...value];
    updatedLearners.splice(index, 1); // Xóa phần tử tại vị trí `index`
    handleChange(name, updatedLearners);
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
        {t("course.who")}
      </Typography>
      <Typography variant="h6">{t("course.write_des")}</Typography>

      {value.map((learner, index) => (
        <Box
          key={index}
          display={"flex"}
          alignItems={"center"}
          sx={{ width: "100%", mt: "20px" }}
        >
          <TextField
            value={learner}
            onChange={(e) => handleLearnerChange(index, e.target.value)}
            label={t("example.py_program")}
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
        onClick={handleAddLearner}
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
        <AddIcon />
        {t("add_more")}
      </Button>
    </Box>
  );
};

export default IntendedLearners;
