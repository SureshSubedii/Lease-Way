import { TERipple } from 'tw-elements-react';

export default function LoginForm(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* App Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Lease Way
        </h1>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        
        <form>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <small className="text-gray-500">
              We’ll never share your email with anyone else.
            </small>
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-700">
              Remember me
            </label>
          </div>

          {/* Forgot password link */}
          <div className="text-right mb-6">
            <a
              href="#!"
              className="text-primary hover:text-primary-600"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <TERipple rippleColor="light" className="w-full">
            <button
              type="button"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Sign in
            </button>
          </TERipple>

          {/* Register link */}
          <p className="mt-6 text-center text-gray-700">
            Not a member?{' '}
            <a
              href="#!"
              className="text-primary hover:text-primary-600"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
