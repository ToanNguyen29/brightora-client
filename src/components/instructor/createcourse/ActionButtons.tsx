import { Box, Stack, Button } from "@mui/material";
import { useThemeContext } from "../../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

type ActionButtonsProps = {
   activeStep: number;
   stepsLength: number;
   handleBack: () => void;
   handleNext: () => void;
   isDisabledNext: boolean;
};

export default function ActionButtons({
   activeStep,
   stepsLength,
   handleBack,
   handleNext,
   isDisabledNext,
}: ActionButtonsProps) {
   const { mode } = useThemeContext();
   const { t } = useTranslation();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const buttonstyle = {
      fontSize: "16px",
      my: "15px",
      backgroundColor: backgroundColor,
      color: textColor,
      padding: "10px 20px",
      fontWeight: "bold",
      ":hover": {
         backgroundColor: backgroundColor,
      },
      width: "100px",
   };
   return (
      <Box
         sx={{
            width: "100%",
            border: "1px solid", // Add border
            padding: 2, // Optional: add padding inside the box
            backgroundColor: backgroundColor,
            color: textColor,
            borderColor: textColor,
         }}
      >
         <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
               disabled={activeStep === 0}
               onClick={handleBack}
               sx={buttonstyle}
            >
               {t("back")}
            </Button>

            <Button
               onClick={handleNext}
               disabled={isDisabledNext}
               sx={buttonstyle}
            >
               {activeStep === stepsLength - 1 ? t("finish") : t("continue")}
            </Button>
         </Stack>
      </Box>
   );
}
