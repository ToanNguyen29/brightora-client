import React from "react";
import { Box, Tab, Tabs, Avatar, Typography } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const tabPaths = [
  "/user/public-profile/",
  "/user/edit-profile/",
  "/user/edit-photo/",
  "/user/edit-account/",
  //   "/user/manage-subscriptions/",
  //   "/user/edit-payment-methods/",
  //   "/user/edit-privacy/",
  //   "/user/edit-notifications/",
  //   "/user/edit-api-clients/",
  "/user/close-account/",
];

export default function VerticalTabs() {
  const { t } = useTranslation();
  const { mode } = useThemeContext();

  const { userInfo } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const currentPathIndex = tabPaths.indexOf(location.pathname);
  const [value, setValue] = React.useState(
    currentPathIndex !== -1 ? currentPathIndex : 0
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabPaths[newValue]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        pt: 0,
        pr: 20,
        pl: 20,
        mb: 5,
        // pb: 20,
        borderColor: mode === "dark" ? "white" : "black",
        backgroundColor: "transparent",
        maxWidth: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "250px",
          minWidth: "250px",
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={`${userInfo.photo}`}
          src={`${userInfo.photo}`}
          sx={{
            width: 150,
            height: 150,
            fontSize: 30,
            marginBottom: "10px",
          }}
        />
        <Typography
          fontWeight={"bold"}
          variant="h6"
          noWrap
          sx={{ marginBottom: "16px" }}
        >
          {`${userInfo.first_name} ${userInfo.last_name}`}
        </Typography>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          sx={{
            alignItems: "flex-start",
            width: "100%",
            borderColor: "divider",
          }}
        >
          <Tab
            label={t("view_public_profile")}
            {...a11yProps(0)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          />
          <Tab
            label={t("profile")}
            {...a11yProps(1)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          />
          <Tab
            label={t("photo")}
            {...a11yProps(2)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          />
          <Tab
            label={t("account_security")}
            {...a11yProps(3)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          />
          {/* <Tab
            label={t("subscriptions")}
            {...a11yProps(4)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          /> */}
          {/* <Tab
            label={t("payment_methods")}
            {...a11yProps(5)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          /> */}
          {/* <Tab
            label={t("privacy")}
            {...a11yProps(6)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          /> */}
          {/* <Tab
            label={t("notifications")}
            {...a11yProps(7)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          /> */}
          {/* <Tab
            label={t("api_clients")}
            {...a11yProps(8)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          /> */}
          <Tab
            label={t("close_account")}
            {...a11yProps(9)}
            sx={{ alignItems: "flex-start", fontSize: 15 }}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          margin: "10px",
          borderRadius: "8px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
