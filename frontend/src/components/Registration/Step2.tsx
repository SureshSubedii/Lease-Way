import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { StepProps2 } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router";

const Step2: React.FC<StepProps2> = ({ onPrevious, formData, handleChange }) => {
    const { theme } = useTheme();
    const { message,uid } = useAuth();
    const navigate = useNavigate()
    const handleSignUp = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const contactRegex = /^9[78][0-9]{8}/
        if(!contactRegex.test(formData.contact.trim())){
            toast.error("Enter  Contact in format 98XXXXXXXX or 97XXXXXXXX ")
            return
        }
        if(!formData.address || !formData.otp){
            console.log(formData)
            toast.error("Fill all the fields ")

            return
        }
        try {
            const {data} = await axios.post("http://localhost:5000/api/user/verify-otp", {
                address: formData.address,
                contact: formData.contact,
                otp: formData.otp,
                uid: uid,
                role: formData.role
              })
              toast.success(data.message)
              navigate('/')
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data.message || error.message)
        }
       
        

        
    }

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
                <div className="mb-4">
                    <label htmlFor="role" className={`block mb-1`}>
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm ${inputBgColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                        <option value="">Select Role</option>
                        <option value="tenant">Tenant</option>
                        <option value="owner">Owner</option>
                    </select>
                </div>
            </div>
            <div className="mb-4 py-1.5">
                <label htmlFor="otp" className={`block mb-1`}>
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
                <small>The OTP Expires in 2 minutes</small>
            </div>
            <div className="mt-2 flex">
                <button
                    type="button"
                    onClick={async (e) => {e.preventDefault();
                        const {data} = await axios.post("http://localhost:5000/api/user/signup", {
                            email: formData.email,
                          })
                          toast.success(data.message)

                    }}
                    className={`w-auto bg-blue-500 text-white font-medium py-1 px-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
                >
                    Send Again
                </button>
            </div>
            <div className="flex gap-4 mt-4">
                {!message && (
                    <button
                        type="button"
                        onClick={onPrevious}
                        className="w-auto bg-gray-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        Previous
                    </button>
                )}
                <button
                    onClick={handleSignUp}
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
