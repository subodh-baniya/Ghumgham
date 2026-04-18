import { useAuth } from "../Contexts/Authcontext"


const Dashboard = () => {

  const auth=useAuth();
  if(!auth){
    return null;
  }
  const {user,logout}=auth;

  const loggingout=()=>{
logout();
  }

  return (
    <div>
      <p>{user?.Username}</p>
      <button onClick={()=>{loggingout()}}>logout</button>
    </div>

    
  )
}

export default Dashboard
