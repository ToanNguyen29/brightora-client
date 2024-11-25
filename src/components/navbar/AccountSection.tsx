import React from "react";
import { Box } from "@mui/material";
import AccountMenu from "./menu/AccountMenu";

const AccountSection: React.FC = () => {
   return (
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
         <AccountMenu />
      </Box>
   );
};

export default AccountSection;
