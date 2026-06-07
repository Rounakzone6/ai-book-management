import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import AppContext from "./AppContext";

const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/book`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setBookList(response.data.books);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token && backendUrl) loadData();
  }, [backendUrl, token]);

  const value = useMemo(
    () => ({
      token,
      backendUrl,
      loading,
      bookList,
      navigate,
      setLoading,
      setToken,
    }),
    [
      token,
      backendUrl,
      loading,
      bookList,
      navigate,
    ],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
