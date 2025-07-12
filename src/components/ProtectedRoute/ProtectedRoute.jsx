import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useAuth();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
