import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutFullWidth: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div style={{ flex: 1, width: "100%", marginBottom: 5 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutFullWidth;
