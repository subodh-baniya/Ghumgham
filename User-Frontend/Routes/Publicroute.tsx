import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/Authcontext";

const Publicroute = () => {
  const auth = useAuth();

  if (!auth) return null;

  const { isAuthenticated, loading } = auth;

  if (loading) return null;

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default Publicroute;