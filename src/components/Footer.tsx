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
import { useTranslation } from "react-i18next"; // Adjust import path if needed
import { useThemeContext } from "../theme/ThemeContext";

const Footer: React.FC = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  const backgroundColor = mode === "dark" ? "#ffffff" : "#000000";
  const textColor = mode === "dark" ? "#000000" : "#ffffff";

  return (
    <Box sx={{ mt: 6, py: 6, px: 4, backgroundColor, color: textColor }}>
      {/* Logo Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <img
          src={`/bt_logo2.png`}
          alt="Course Shop Logo"
          style={{ width: 150 }}
        />{" "}
        {/* Replace with actual logo path */}
      </Box>

      <Grid container spacing={4}>
        {/* About Us Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {t("about_us")}
          </Typography>
          <Typography variant="body2">{t("about_us_description")}</Typography>
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} md={4}>
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
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ display: "block" }}
            >
              {t("contact_us")}
            </Link>
          </Box>
        </Grid>

        {/* Contact Info Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {t("contact_info")}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("address")}: 1234 Course Lane, Education City, USA
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("phone")}: +1 234 567 890
          </Typography>
          <Typography variant="body2">
            {t("email")}: info@courseshop.com
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Social Media Icons */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {t("follow_us")}
        </Typography>
        <IconButton
          href="#"
          color="inherit"
          aria-label="Facebook"
          sx={{ mx: 1 }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          href="#"
          color="inherit"
          aria-label="Twitter"
          sx={{ mx: 1 }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          href="#"
          color="inherit"
          aria-label="Instagram"
          sx={{ mx: 1 }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          href="#"
          color="inherit"
          aria-label="LinkedIn"
          sx={{ mx: 1 }}
        >
          <LinkedIn />
        </IconButton>
      </Box>

      {/* Payment Methods Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <img
          src={`/paymentmethod.jpg`}
          alt="Payment Methods"
          style={{ width: 300 }}
        />{" "}
        {/* Replace with actual image path */}
      </Box>

      {/* Copyright Section */}
      <Box sx={{ mt: 4, textAlign: "center", pt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Course Shop.{" "}
          {t("all_rights_reserved")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
