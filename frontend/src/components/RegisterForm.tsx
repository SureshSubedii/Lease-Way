import { TERipple } from "tw-elements-react";
import { useTheme } from "../ThemeContext";

export default function RegisterForm(): JSX.Element {
    const { theme } = useTheme();

    // Define color classes based on the theme
    const bgColor = theme === 'Dark' ? 'bg-gray-800' : 'bg-white';
    const textColor = theme === 'Dark' ? 'text-gray-100' : 'text-gray-800';
    const borderColor = theme === 'Dark' ? 'border-gray-600' : 'border-gray-300';
    const inputBgColor = theme === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';
    const checkboxColor = theme === 'Dark' ? 'text-blue-400' : 'text-blue-500';
    const buttonBgColor = theme === 'Dark' ? 'bg-blue-600' : 'bg-blue-500';
    const buttonHoverBgColor = theme === 'Dark' ? 'hover:bg-blue-500' : 'hover:bg-blue-600';
  
    return (
      <div className={`flex items-center justify-center min-h-screen ${theme === 'Dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${bgColor}`}>
    
  
          {/* Form Title */}
          <h2 className={`text-2xl font-semibold mb-6 text-center ${textColor}`}>
            Register
          </h2>
          
          <form>

            <div className="mb-4">
              <label htmlFor="fullName" className={`block ${textColor} mb-1`}>
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your Fullname"
                className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={`block ${textColor} mb-1`}>
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              <small className={`text-gray-500 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                We’ll never share your email with anyone else.
              </small>
              
              {/* Send OTP button */}
              <div className="mt-2">
                  <button
                    type="button"
                    onClick={ (e) => e.preventDefault()}
                    className={`w-auto ${buttonBgColor} text-white font-medium py-2 px-4 rounded-lg shadow-md ${buttonHoverBgColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
                  >
                    Send OTP
                  </button>
                  <br />
                  <small className={`text-gray-500 ${theme === 'Dark' ? 'text-gray-400' : 'text-gray-500'}`}>
               The Otp expires in 2 minutes. Click send otp again if the otp has expired
              </small>

              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="otp" className={`block ${textColor} mb-1`}>
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP from your mail"
                className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
  
            {/* Password input */}
            <div className="mb-4">
              <label htmlFor="password" className={`block ${textColor} mb-1`}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create password"
                className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPass" className={`block ${textColor} mb-1`}>
              Confirm Password
              </label>
              <input
                type="password"
                id="confirmPass"
                placeholder="Create password"
                className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
  
            {/* Remember me checkbox */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="rememberMe"
                className={`h-4 w-4 ${checkboxColor} border-gray-300 rounded focus:ring-blue-500`}
              />
              <label htmlFor="rememberMe" className={`ml-2 ${textColor}`}>
                Remember me
              </label>
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
            <TERipple rippleColor="light" className="w-full">
              <button
                type="button"
                className={`w-full ${buttonBgColor} text-white font-medium py-2 px-4 rounded-lg shadow-md ${buttonHoverBgColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
              >
                Sign Up
              </button>
            </TERipple>
  
            {/* Register link */}
            <p className={`mt-6 text-center ${textColor}`}>
              Already have an account?{' '}
              <a
                href="#!"
                className={`text-blue-500 hover:text-blue-600 ${theme === 'Dark' ? 'Dark:text-blue-400 Dark:hover:text-blue-300' : ''}`}
              >
                LogIn
              </a>
            </p>
          </form>
        </div>
      </div>
    );
}
