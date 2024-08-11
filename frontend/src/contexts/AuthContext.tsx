// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';


interface AuthContextType {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  step: number;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>; 
  uid: number;
  setUid: React.Dispatch<React.SetStateAction<number>>; 
  setStep: React.Dispatch<React.SetStateAction<number>>; 

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [message, setMessage] = useState<string>( ()=> sessionStorage.getItem('message') ||"*Enter The OTP from the mail")
    const [step, setStep] = useState<number>(()=>  Number(sessionStorage.getItem('step')) || 1 )
    const [uid, setUid] = useState<number>(()=>  Number(localStorage.getItem('uid')) || 0 )

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(()=> {

      return  localStorage.getItem('isAuthenticated') === "true" ;

    });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', String(isAuthenticated));

  }, [user,isAuthenticated]);
  useEffect(() => {
    sessionStorage.setItem('step', String(step));

  }, [step])
  useEffect(() => {
    localStorage.setItem('uid', String(uid));

  }, [uid])


  const login = async (user: User) => {
    setUser({ username: user.username, email: user.email });
      setIsAuthenticated(true);
  
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    step,
    setStep,
    message,
    setMessage,
    uid,
    setUid
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
