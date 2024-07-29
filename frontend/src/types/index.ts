export interface StepProps {
    onNext: () => void;
    formData: { name: string; email: string, password: string, contact: string, address: string, otp: number, confirmPass: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StepProps2 extends Omit<StepProps, 'onNext'> {
    onPrevious: () => void;
}
