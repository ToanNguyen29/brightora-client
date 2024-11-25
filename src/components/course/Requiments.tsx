import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

interface RequimentsProps {
  requirements: string[];
}

const Requiments: React.FC<RequimentsProps> = ({ requirements }) => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const headerBackgroundColor = mode === "light" ? "#f0f0f0" : "#333333";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        width: "100%",
        mb: "20px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          padding: 2,
          borderRadius: "12px",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textAlign: "center",
            backgroundColor: headerBackgroundColor,
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {t("requiments")}
        </Typography>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        > */}
        {/* Sử dụng CSS Grid để chia thành 2 cột */}
        <List
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            padding: 0,
          }}
        >
          {requirements.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "40px", // Giảm khoảng cách mặc định của icon
                }}
              >
                <CheckIcon sx={{ color: "green" }} />
              </ListItemIcon>
              <Typography variant="subtitle2">{item}</Typography>
            </ListItem>
          ))}
        </List>
        {/* </Box> */}
      </Paper>
    </Box>
  );
};

export default Requiments;
