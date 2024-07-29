import { useTheme } from "../ThemeContext";
type Step1Props = {
    onNext: () => void;
    formData: { name: string; email: string, password: string, contact: string, address: string, otp: number }; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const Step1: React.FC<Step1Props> = ({ onNext, formData, handleChange }) => {
    const { theme } = useTheme();
    const borderColor = theme === 'Dark' ? 'border-gray-600' : 'border-gray-300';
    const inputBgColor = theme === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';

    return (
        <>
            <div className="mb-4">
                <label htmlFor="fullName" className={`block mb-1`}>
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your Fullname"
                    className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className={`block mb-1`}>
                    Email address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className={`block mb-1`}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPass" className={`block mb-1`}>
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPass"
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
            </div>
            <div className="flex mt-4">
                <button
                    type="button"
                    onClick={onNext}
                    className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
                >
                    Next
                </button>
            </div>
            </>    );
}

export default Step1;
