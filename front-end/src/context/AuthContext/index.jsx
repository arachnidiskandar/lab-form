import React, { useEffect, useState } from 'react';
import { fb } from '../../config/Fire';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
