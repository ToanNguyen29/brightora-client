import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";

interface CourseCard {
   _id: string;
   thumbnail: string;
   title: string;
   duration: string;
   owner_name: string;
   rating: number;
   buying: number;
   price: number;
}

const CourseCardPayment: React.FC<CourseCard> = ({
   _id,
   thumbnail,
   title,
   duration,
   owner_name,
   rating,
   buying,
   price,
}) => {
   const { mode } = useThemeContext();
   const { t } = useTranslation();
   const navigate = useNavigate();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   return (
      <Box
         sx={{
            borderBottom: "1px solid",
            borderColor: mode === "light" ? "#ccc" : "#555",
            borderRadius: "0px",
            p: 1.5,
            mx: "auto",
            width: "100%",
            display: "flex",
            backgroundColor: backgroundColor,
            color: textColor,
            "&:hover": {
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
         }}
      >
         <Box
            onClick={() => navigate(`/course/${_id}`)}
            sx={{
               flex: 6,
               display: "flex",
               alignItems: "center",
               mr: 1,
            }}
         >
            <Box
               sx={{
                  mr: 1.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <img
                  src={thumbnail}
                  alt={title}
                  style={{
                     width: "100%",
                     height: "auto",
                     maxWidth: "150px",
                     maxHeight: "150px",
                     objectFit: "cover",
                     borderRadius: "8px",
                  }}
               />
            </Box>
            <Box sx={{ flex: 2, textAlign: "left" }}>
               <Typography
                  variant="subtitle1"
                  sx={{
                     color: textColor,
                     fontWeight: "bold",
                  }}
               >
                  {title}
               </Typography>
               <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: textColor, mt: 0.5, fontSize: "0.75rem" }}
               >
                  {t("By")}: {owner_name}
               </Typography>
               <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: textColor, mt: 0.5, fontSize: "0.75rem" }}
               >
                  {t("rating")}: {rating} ★ {`(${buying} students)`}
               </Typography>
               <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: textColor, mt: 0.5, fontSize: "0.75rem" }}
               >
                  {t("duration")}: {duration}
               </Typography>
            </Box>
         </Box>

         <Box
            sx={{
               flex: 1,
               textAlign: "center",
            }}
         >
            <Typography
               variant="subtitle1"
               sx={{ color: textColor, fontWeight: "bold" }}
            >
               {`$${price.toFixed(3)}`}
            </Typography>
         </Box>
      </Box>
   );
};

export default CourseCardPayment;
