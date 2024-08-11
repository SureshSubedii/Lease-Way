import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router';
import googleImage from '../../assets/google.png';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm(): JSX.Element {
  const { theme } = useTheme();
  const { login, setStep, setMessage, setUid } = useAuth();
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState({email: "", password: ""})

  // Define color classes based on the theme
  const bgColor = theme === 'Dark' ? 'bg-gray-800' : 'bg-white';
  const textColor = theme === 'Dark' ? 'text-gray-100' : 'text-gray-800';
  const borderColor = theme === 'Dark' ? 'border-gray-600' : 'border-gray-300';
  const inputBgColor = theme === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';
  const buttonBgColor = theme === 'Dark' ? 'bg-blue-600' : 'bg-blue-500';
  const buttonHoverBgColor = theme === 'Dark' ? 'hover:bg-blue-500' : 'hover:bg-blue-600';

  const handleSignin = async () =>{
    try {
      const {data} = await axios.post("http://localhost:5000/api/user/login", 
        currentUser
      )
      await login(data);

    toast.success(data.message)
      
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const {inactive, message,uid, ...details} = error.response?.data || null
     
      toast.error(message|| error.message)
      if(inactive){ 
        const message = "*Please complete the registration process to proceed. The Otp is sent to Your Email"
      setStep(2)
      setUid(uid)
      setMessage(message)
      await  login(details)
      sessionStorage.setItem("message", message)
      navigate(`signup`)
       await axios.post("http://localhost:5000/api/user/signup", {
        email: details.email,
      })
      }
      sessionStorage.setItem('autoLoginHasRun', 'true');


      
    }

   

  }

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value }= event.target
    setcurrentUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));  }

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'Dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${bgColor}`}>
        {/* App Title */}
        <h1 className={`text-4xl font-bold text-center mb-8 ${textColor}`}>
          Lease Way
        </h1>

        {/* Form Title */}
        <h2 className={`text-2xl font-semibold mb-6 text-center ${textColor}`}>
          Login
        </h2>
        
        <form>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className={`block ${textColor} mb-1`}>
              Email address
            </label>
            <input
              onChange={ (e)=> handleUser(e)}
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <small className={`text-gray-500 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              We’ll never share your email with anyone else.
            </small>
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className={`block ${textColor} mb-1`}>
              Password
            </label>
            <input
              onChange={ (e)=> handleUser(e)}
              name = "password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

         

          {/* Forgot password link */}
          <div className="text-right mb-6">
            <a
              href="#!"
              className={`text-blue-500 hover:text-blue-600 ${theme === 'Dark' ? 'Dark:text-blue-400 Dark:hover:text-blue-300' : ''}`}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
              onClick={ ()=> handleSignin()}

            
            type="button"
            className={`w-full ${buttonBgColor} text-white font-medium py-2 px-4 rounded-lg shadow-md ${buttonHoverBgColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
          >
            Sign in
          </button>

          <div className="flex items-center justify-center mt-6">
            <p className={`mr-2 ${textColor}`}>Or continue with</p>
            <img
            onClick={async () => {
              window.location.href = 'http://localhost:5000/api/auth/google';
            }}
            src={googleImage}
            alt="Google"
            className="w-16 h-16 rounded-full cursor-pointer"
          />

          </div>

          {/* Register link */}
          <p className={`mt-6 text-center ${textColor}`}>
            Not a member?{' '}
            <a
              onClick={() => navigate("/signup")}
              className={`text-blue-500 hover:text-blue-600 cursor-pointer ${theme === 'Dark' ? 'Dark:text-blue-400 Dark:hover:text-blue-300' : ''}`}
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
