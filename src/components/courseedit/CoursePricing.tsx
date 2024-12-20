import { Box, Typography, Button, TextField } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Head from "./Head";
import { useEffect, useState } from "react";
import { IUpdateCourse } from "../../models/Course";
import { getCourse, updateCourse } from "../../services/CourseService";
import { useParams } from "react-router-dom";
import AutoCloseAlert from "../reused/Alert";

const CoursePricing: React.FC = () => {
  const [price, setPrice] = useState<number>(0);
  const token = localStorage.getItem("token");
  const [alertOpen, setAlertOpen] = useState(false);
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  const commonTextFieldStyles = {
    width: "30%",
    mb: "20px",
    borderRadius: 5,
    fontSize: "20px",
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getCourse(id).then((data) => {
          if (data.status <= 305) {
            console.log("course message", data);
            setPrice(data.data.price);
          }
        });
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    const formData: IUpdateCourse = {
      price,
    };
    if (id) {
      await updateCourse(token, id, formData).then((data) => {
        console.log("Price:", data);
        setAlertOpen(true);
      });
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      sx={{
        border: "0.5px groove",
        backgroundColor: backgroundColor,
        color: textColor,
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Head title={"Pricing"} />
      <AutoCloseAlert
        severity="success"
        message="Save change completed."
        open={alertOpen}
        onClose={handleCloseAlert}
      />
      <Typography variant="h6" fontWeight={"bold"} ml="20px" mt={5}>
        {t("Set a price for your course")}
      </Typography>
      <Typography variant="h6" ml="20px" mb="20px">
        {t(
          "Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests can not be free."
        )}
      </Typography>

      <Box mx="20px" sx={{ display: "flex", textAlign: "center" }}>
        <TextField
          fullWidth
          name="subtitle"
          //  type="number"
          value={price}
          onChange={handlePriceChange}
          sx={commonTextFieldStyles}
        />
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign="center"
          sx={{ ml: 4 }}
        >
          USD
        </Typography>
      </Box>

      <Button
        sx={{
          fontSize: "16px",
          my: "15px",
          ml: "20px",
          backgroundColor: textColor,
          color: backgroundColor,
          padding: "10px 20px",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: textColor,
          },
          width: "200px",
        }}
        onClick={handleSave}
      >
        {t("Update Price")}
      </Button>
    </Box>
  );
};

export default CoursePricing;
