import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Box } from "@mui/material";

interface LayoutProps {
   children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
   return (
      <div>
         <Navbar />
         <Box
            style={{ width: "100%", height: "100%" }}
            display={"flex"}
            flexDirection={"column"}
         >
            <Outlet />
            <Footer />
         </Box>
      </div>
   );
};

export default Layout;
