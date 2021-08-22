import React, { useEffect, useState } from 'react';
import { fb } from '../../config/Fire';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      localStorage.setItem('user', JSON.stringify(user)); // Firebase resets user state on page reload
      setCurrentUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
