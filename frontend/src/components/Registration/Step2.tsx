import { useTheme } from "../../ThemeContext";
import {  StepProps2 } from "../../types";

const Step2: React.FC<StepProps2> = ({ onPrevious, formData, handleChange }) => {
    const { theme } = useTheme();
    const borderColor = theme === 'Dark' ? 'border-gray-600' : 'border-gray-300';
    const inputBgColor = theme === 'Dark' ? 'bg-gray-700' : 'bg-gray-50';

    return (
        <>
            <div className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="address" className={`block mb-1`}>
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Address"
                        className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className={`block mb-1`}>
                        Contact
                    </label>
                    <input
                        type="number"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}

                        placeholder="Enter Contact"
                        className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                </div>
            </div>
            <div className="mb-4 py-1.5">
                <label htmlFor="otp" className={`block  mb-1`}>
                    OTP
                </label>
                <input
                    type="number"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter the OTP from your email"
                    className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                <small className={``} >The Otp Expires in 2 minutes</small>
            </div>
            <div className="mt-2 flex fl">
                <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className={`w-auto bg-blue-500 text-white font-medium py-1 px-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
                >
                    Send  Again
                </button>

            </div>
            <div className="flex gap-4 mt-4">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="w-auto bg-gray-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
                >
                    Submit
                </button>
            </div>
        </>
    );
}

export default Step2;
