// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState();
  const login = () => {
    setLoggedIn(true);
    navigate("/private/dashboard");
  };

  const logout = () => {
    setLoggedIn(false);
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login , logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {return useContext(AuthContext)};
