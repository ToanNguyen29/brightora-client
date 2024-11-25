import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
  PaperProps as MuiPaperProps,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../context/AuthContext";
import { logOut } from "../../../services/AuthService";

import { useThemeContext } from "../../../theme/ThemeContext";
import { categoriesItem } from "./categoriesItem";

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
  },
};

const CategoriesMenu: React.FC = () => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mode } = useThemeContext();

  const { setUserInfo } = useAuth();

  const { setIsAuthenticated, setIsLoadingAuth } = useAuth();

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
    if (url) {
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
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onMouseEnter={handleMenuOpen}
        sx={{ ml: 2, color: mode === "dark" ? "white" : "black" }}
      >
        {t("categories")}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
        }}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          mt: "5px",
        }}
      >
        {categoriesItem.map((item, index) =>
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

export default CategoriesMenu;
