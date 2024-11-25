import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutFullWidth: React.FC = () => {
   return (
      <div>
         <Navbar />
         <div style={{ width: "100%" }}>
            <Outlet />
            <Footer />
         </div>
      </div>
   );
};

export default LayoutFullWidth;
