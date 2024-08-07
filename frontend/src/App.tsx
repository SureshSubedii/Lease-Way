import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Registration/RegisterForm';
import Home from './components/Home';

import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { toggleTheme, theme } = useTheme();
  const {isAuthenticated} =  useAuth()

  return (
    <div className={`min-h-screen ${theme === 'Dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      >
        {theme} mode
      </button>
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
