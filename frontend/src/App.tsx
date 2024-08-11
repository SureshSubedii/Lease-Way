import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Registration/RegisterForm';
import Home from './components/Home';

import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AppContent() {
  const { toggleTheme, theme } = useTheme();
  axios.defaults.withCredentials = true

  const {isAuthenticated, logout} =  useAuth()
  const autoLogin = async()=>{
    try {
    await axios.post("http://localhost:5000/api/user/auto-login",{},);
      
    } catch (error) {
      toast.error("Session Expired. Please Login Again")
      handleLogout(false)
      
    }
  }

  const handleLogout = async(call = true)=>{
   
  if(call) {
     const {data}  =  await axios.post("http://localhost:5000/api/user/logout")
    toast.success(data.message)
  }

    localStorage.clear()
    sessionStorage.clear()
    logout()
    

  }

  useEffect( ()=>{
    const hasRun = sessionStorage.getItem('autoLoginHasRun');
    if(hasRun !== "true"){
      if(isAuthenticated){
        autoLogin()
        sessionStorage.setItem('autoLoginHasRun', 'true');

      }}


  },[])

  return (
    <div className={`min-h-screen ${theme === 'Dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      >
        {theme} mode
      </button>
      {isAuthenticated &&
       <button
       onClick={()=>handleLogout()}
       className="fixed top-4 right-40 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
     >
       Log Out
     </button> }
     
      <div className="flex items-center justify-center min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={ !isAuthenticated? (<LoginForm />) : <Home/>} />
            <Route path="/signup" element={<RegisterForm />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
