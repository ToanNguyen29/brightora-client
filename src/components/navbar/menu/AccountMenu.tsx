import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
  PaperProps as MuiPaperProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { menuItems } from "./menuItems"; // Adjust the path as necessary
import { useAuth } from "../../../context/AuthContext";
import { logOut } from "../../../services/AuthService";

const paperProps: MuiPaperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const AccountMenu: React.FC = () => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { setUserInfo } = useAuth();

  const { userInfo, setIsAuthenticated, setIsLoadingAuth } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    try {
      const res = await logOut(token);

      if (res.status <= 304) {
        console.log("logged out");
        setIsLoadingAuth(true);
        setIsAuthenticated(false);
        setUserInfo({});
        window.location.href = "/";
      } else {
        alert(`Error: ${res.detail}}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuItemClick = (url?: string, textKey?: string) => {
    handleMenuClose();
    if (textKey === "instruction_dashboard") {
      // console.log("url");
      window.open(url, "_blank");
    }
    if (textKey !== "instruction_dashboard" && url) {
      window.location.href = url;
    }
    if (textKey === "logout") {
      handleLogOut();
    }
  };

  return (
    <Box
      onMouseEnter={handleMenuOpen}
      onMouseLeave={handleMouseLeave}
      sx={{ display: "inline-block" }}
    >
      <IconButton
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{ width: 40, height: 40 }}
          src={`${userInfo.photo}`}
          alt={userInfo.photo}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
        }}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems.map((item, index) =>
          item.divider ? (
            <Divider key={index} />
          ) : (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(item.url, item.textKey)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {t(item.textKey!)}
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
};

export default AccountMenu;
