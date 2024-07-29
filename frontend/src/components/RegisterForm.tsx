import { useState } from 'react';
import { useTheme } from "../ThemeContext";
import Step1 from './Step1';
import Step2 from './Step2';
import { useNavigate } from 'react-router';

export default function RegisterForm(): JSX.Element {
    const [step, setStep] = useState(1);
    const { theme } = useTheme();
    const bgColor = theme === 'Dark' ? 'bg-gray-900' : 'bg-gray-100';
    const containerBgColor = theme === 'Dark' ? 'bg-gray-800' : 'bg-white';
    const textColor = theme === 'Dark' ? 'text-gray-100' : 'text-gray-800';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', 
        contact: '',
         address: '',
         confirmPass: '',
          otp: 0
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const navigate = useNavigate()

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrevious = () => setStep(prev => prev - 1);

    return (
        <div className={`flex items-center justify-center min-h-screen w-1/2 ${bgColor}`}>
            <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${containerBgColor}`}>
                {/* Form Title */}

                <h2 className={`text-2xl font-semibold mb-6 text-center ${textColor}`}>
                    Register
                </h2>

                <form className={`${textColor}`}>
                    {step === 1 && <Step1 onNext={handleNext} formData={formData}
                        handleChange={handleChange} />}
                    {step === 2 && <Step2 onPrevious={handlePrevious} formData={formData}
                        handleChange={handleChange} />}
                </form>
                <p className={`mt-6 text-center ${textColor}`}>
                    Already have  an account?{' '}
                    <a
                        onClick={() => navigate("/login")}
                        className={`text-blue-500 hover:text-blue-600 cursor-pointer ${theme === 'Dark' ? 'Dark:text-blue-400 Dark:hover:text-blue-300' : ''}`}
                    >
                        LogIn
                    </a>
                </p>
            </div>
        </div>
    );
}
