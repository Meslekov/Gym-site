import React, { createContext, useState, useContext, useEffect } from 'react';

const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    // Initialize userType from local storage or default to null
    return localStorage.getItem('userType') || null;
  });

  const [userName, setUserName] = useState(() => {
    // Initialize userName from local storage or default to null
    return localStorage.getItem('username') || null;
  });

  useEffect(() => {
    // Update local storage whenever userType changes
    localStorage.setItem('userType', userType);
  }, [userType]);

  useEffect(() => {
    // Update local storage whenever userName changes
    localStorage.setItem('username', userName);
  }, [userName]);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType, userName, setUserName }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => useContext(UserTypeContext);
