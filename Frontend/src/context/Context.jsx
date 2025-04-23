import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios"; 

export const UserContext = createContext();



export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const navigate = useNavigate();
  

    useEffect(() => {
      const publicRoutes = ["/", "/about"]; // Define pages that don't require login
  
      if (!token && !publicRoutes.includes(location.pathname)) {
        navigate("/login");
        return;
      }
  

    // Fetch user data if the token exists
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-cart", {
          withCredentials: true, 
        });

        if (response.data.success) {
          setUser(response.data.cart);
          console.log("context", response.data.cart);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUserData();
  }, [token]); 
  return (
    <UserContext.Provider value={{ user, token }}>
      {children}
    </UserContext.Provider>
  );
};
