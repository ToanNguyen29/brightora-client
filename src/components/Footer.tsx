import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import LanguageSwitcher from "./navbar/languageSwitcher/LanguageSwitcher";

const Footer: React.FC = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
  const textColor = mode === "dark" ? "#000000" : "#ffffff";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        py: 4,
        px: { xs: 1, sm: 2 },
        backgroundColor,
        color: textColor,
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {t("follow_us")}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            href="https://www.facebook.com/letanloc202"
            color="inherit"
            aria-label="Facebook"
          >
            <Facebook sx={{ fontSize: 36 }} /> {/* Tăng kích thước icon */}
          </IconButton>
          <IconButton
            href="https://www.facebook.com/letanloc202"
            color="inherit"
            aria-label="Twitter"
          >
            <Twitter sx={{ fontSize: 36 }} />
          </IconButton>
          <IconButton
            href="https://www.facebook.com/letanloc202"
            color="inherit"
            aria-label="Instagram"
          >
            <Instagram sx={{ fontSize: 36 }} />
          </IconButton>
          <IconButton
            href="https://www.facebook.com/letanloc202"
            color="inherit"
            aria-label="LinkedIn"
          >
            <LinkedIn sx={{ fontSize: 36 }} />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#333333", my: 4 }} />

      {/* Phần nội dung chính */}
      <Grid container spacing={4}>
        {/* Cột bên trái: 3 phần nội dung chính */}
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("about_us")}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                {t("about_us_description")}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("quick_links")}
              </Typography>
              <Box>
                <Link
                  href="#"
                  color="inherit"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  {t("home")}
                </Link>
                <Link
                  href="#"
                  color="inherit"
                  underline="hover"
                  sx={{ display: "block", mb: 1 }}
                >
                  {t("courses")}
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  {t("contact_us")}
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {t("contact_info")}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 1 }}>
                {t("address")}: 01 Vo Van Ngan Street, Thu Duc City, Viet Nam
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 1 }}>
                {t("phone")}: +84 37 9460 409
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                {t("email")}: 20110379@student.hcmute.edu.vn
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Cột bên phải: LanguageSwitcher */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LanguageSwitcher mode={mode} />
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          fontSize: 14,
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        © {new Date().getFullYear()} BrightOra. {t("all_rights_reserved")}.
      </Typography>
    </Box>
  );
};

export default Footer;
