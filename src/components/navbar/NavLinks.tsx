import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

interface NavLinksProps {
   mode: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ mode }) => {
   const { t } = useTranslation();
   const borderColor = mode === "dark" ? "white" : "black";

   const { isAuthenticated } = useAuth();

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

         {isAuthenticated && (
            <Button
               color="inherit"
               component={Link}
               to="/instructor/course"
               sx={{
                  ml: 2,
                  color: mode === "dark" ? "white" : "black",
                  borderRadius: 1,
               }}
            >
               {t("instructor")}
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
