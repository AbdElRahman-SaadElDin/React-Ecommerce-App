import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
