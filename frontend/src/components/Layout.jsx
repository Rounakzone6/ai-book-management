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
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-gray-400">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" placeholder="Search..." className="outline-none border border-gray-300 px-3 py-2 rounded text-sm text-gray-700 bg-transparent w-64" />
          </div>
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
