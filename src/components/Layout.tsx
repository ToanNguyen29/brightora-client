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
    <div style={{ height: "100vh" }}>
      <Navbar />
      <Box style={{ width: "100%" }} display={"flex"} flexDirection={"column"}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;
