import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AppContext from "../contexts/AppContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../assets/assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { backendUrl, setToken, navigate } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password
      });

      if (response.data.success) {
        toast.success("Login successful!");
        setToken(response.data.token);
        navigate("/add-book");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-['Inter','Outfit',sans-serif]">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        <div className="w-full max-w-100">
          <h1 className="text-[28px] font-bold text-[#334155] mb-1.5">Login</h1>
          <p className="text-[13px] text-[#64748b] mb-10">Enter your details to login into the system.</p>
          
          <form onSubmit={onSubmitHandler}>
            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="text-[13px] font-semibold text-[#0f172a] mb-2">Email / Username</label>
              <div className="relative flex items-center">
                <input 
                  id="email"
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  type="email" 
                  placeholder="Enter your email/username" 
                  className="w-full px-4 py-3.5 border border-[#e2e8f0] rounded-md text-sm text-[#334155] outline-none transition-colors focus:border-[#5b52e5] placeholder-[#94a3b8]"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="text-[13px] font-semibold text-[#0f172a] mb-2">Password</label>
              <div className="relative flex items-center">
                <input 
                  id="password"
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="w-full px-4 py-3.5 border border-[#e2e8f0] rounded-md text-sm text-[#334155] outline-none transition-colors focus:border-[#5b52e5] placeholder-[#94a3b8]"
                  required
                />
                <div 
                  className="absolute right-4 text-[#94a3b8] cursor-pointer flex items-center justify-center" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </div>
              </div>
              <a href="#" className="block text-right text-[13px] font-semibold text-blue-600 mt-2.5 hover:underline">Forgot Password?</a>
            </div>
            
            <button 
              className="w-full py-3.5 bg-[#5b52e5] hover:bg-[#4b41c5] text-white rounded-md text-[15px] font-semibold transition-colors mt-2 disabled:bg-[#94a3b8] disabled:cursor-not-allowed" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      
      <div className="hidden md:block flex-1 relative">
        <img src={login} alt="Login background" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
