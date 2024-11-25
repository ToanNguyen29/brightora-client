import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import LoadingPage from "./LoadingPage";

interface ProtectedClassRouteProps {
   children?: React.ReactNode;
}

const ProtectedClassRoute: React.FC<ProtectedClassRouteProps> = ({
   children,
}) => {
   const [isInCourse, setIsInCourse] = useState<boolean>(true);
   const [isLoadingCourse, setIsLoadingCourse] = useState<boolean>(true);
   const navigate = useNavigate();

   useEffect(() => {
      //   const fetchClass = async () => {};
      //   fetchClass();
      if (!isLoadingCourse && !isInCourse) {
         navigate("/login");
      }
   }, [isLoadingCourse, isInCourse, navigate]);

   // if (isLoadingAuth) return <LoadingPage />;
   return isInCourse ? <>{children}</> : null;
};

export default ProtectedClassRoute;
