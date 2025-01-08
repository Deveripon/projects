import Link from "next/link";
import RegistrationForm from "./form/RegistrationForm";

const RegisterPageCard = () => {
    return (
        <>
            <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Sign up to Hotel Booking
                </h2>
                <p className='text-gray-600 text-sm mt-2'>
                    Welcome ! Let&apos;s get you signed up.
                </p>
            </div>

            <div className='space-y-4 mb-4'>
                <RegistrationForm />
            </div>

            <div className='text-center text-sm text-gray-600'>
                <p>
                    Already have an account?
                    <Link
                        href='/login'
                        replace
                        className='text-primary hover:underline'>
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
};

export default RegisterPageCard;
