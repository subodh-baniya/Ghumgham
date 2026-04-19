import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <Topbar />

        {/* Dynamic content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Dashboard;