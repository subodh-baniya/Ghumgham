import {useAuth} from "../Contexts/Authcontext"
import {Outlet} from "react-router-dom"
import {Navigate} from "react-router-dom"

const ProtectedRoute = () => {

  const auth=useAuth()

  if(!auth){
    return null;
  }

  const {isAuthenticated}=auth;

 return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

export default ProtectedRoute
