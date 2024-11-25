import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import LoadingPage from "./LoadingPage";

interface ProtectedRouteProps {
   children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const { isAuthenticated, isLoadingAuth } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (!isLoadingAuth && !isAuthenticated) {
         navigate("/login");
      }
   }, [isAuthenticated, isLoadingAuth, navigate]);

   // if (isLoadingAuth) return <LoadingPage />;
   return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
