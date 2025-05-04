import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInAccount, setLoggedInAccount] = useState(null);

    const handleLogut = () => {
        setLoggedInAccount(null); 
    }
  
    return (
      <AuthContext.Provider value={{ loggedInAccount, setLoggedInAccount, handleLogut }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);