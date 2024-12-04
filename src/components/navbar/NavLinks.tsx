import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import UserInfo from "../user/user-accout-page/UserInfo";

interface NavLinksProps {
  mode: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ mode }) => {
  const { t } = useTranslation();
  const borderColor = mode === "dark" ? "white" : "black";

  const { isAuthenticated, userInfo } = useAuth();

  return (
    <>
      <Button
        color="inherit"
        component={Link}
        to="/"
        sx={{
          ml: 2,
          color: mode === "dark" ? "white" : "black",
          borderRadius: 1,
        }}
      >
        {t("home")}
      </Button>

      <Button
        color="inherit"
        component={Link}
        to="/about"
        sx={{
          ml: 2,
          color: mode === "dark" ? "white" : "black",
          borderRadius: 1,
        }}
      >
        {t("about")}
      </Button>

      {isAuthenticated && userInfo.role === "Instructor" ? (
        <Button
          color="inherit"
          component={Link}
          to="/instructor/course"
          target="_blank"
          sx={{
            ml: 2,
            color: mode === "dark" ? "white" : "black",
            borderRadius: 1,
          }}
        >
          {t("instructor")}
        </Button>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to="/sign-to-instructor"
          target="_blank"
          sx={{
            ml: 2,
            color: mode === "dark" ? "white" : "black",
            borderRadius: 1,
          }}
        >
          {t("become_to_instructor")}
        </Button>
      )}

      {isAuthenticated && (
        <Button
          color="inherit"
          component={Link}
          to="/my-course"
          sx={{
            ml: 2,
            color: mode === "dark" ? "white" : "black",
            borderRadius: 1,
            mr: 2,
          }}
        >
          {t("my_learning")}
        </Button>
      )}

      {!isAuthenticated && (
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            ml: 2,
            color: mode === "dark" ? "white" : "black",
            border: `1px solid ${borderColor}`,
            borderRadius: 1,
            px: 2,
          }}
        >
          {t("login")}
        </Button>
      )}

      {!isAuthenticated && (
        <Button
          color="inherit"
          component={Link}
          to="/signup"
          sx={{
            ml: 2,
            color: mode === "dark" ? "white" : "black",
            border: `1px solid ${borderColor}`,
            borderRadius: 1,
            px: 2,
          }}
        >
          {t("sign_up")}
        </Button>
      )}
    </>
  );
};

export default NavLinks;
