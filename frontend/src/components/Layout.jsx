import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppContext from "../contexts/AppContext";

const Layout = () => {
  const { token, setToken, navigate } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
    if(confirm("Are you sure you want to logout?")){
      setToken("");
      navigate("/login");
    }
  };

  return (
    <div className="flex bg-[#f5f6fa] min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-end items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div onClick={logout} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Rounak+Gupta&background=0D8ABC&color=fff" alt="User Avatar" />
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold text-gray-800">Rounak Gupta</span>
              <span className="text-gray-500 text-xs">Software Developer</span>
            </div>
          </div>
        </div>  
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
