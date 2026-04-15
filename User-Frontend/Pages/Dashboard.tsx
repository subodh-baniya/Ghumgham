import { useAuth } from "../Contexts/Authcontext"


const Dashboard = () => {

  const auth=useAuth();
  if(!auth){
    return null;
  }
  const {user}=auth;
  return (
    <div>
      <p>{user?.Username}</p>
    </div>
  )
}

export default Dashboard
