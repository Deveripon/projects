import Link from "next/link";
import LoginForm from "./form/LoginForm";

const LoginPageCard = () => {
    return (
        <>
            <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Log in to Hotel Booking
                </h2>
                <p className='text-gray-600 text-sm mt-2'>
                    Welcome back! Let&apos;s get you signed in.
                </p>
            </div>

            <div className='space-y-4 mb-4'>
                <LoginForm />
            </div>

            <div className='text-center text-sm text-gray-600'>
                <p>
                    Don&apos;t have an account?
                    <Link
                        href='/register'
                        replace
                        className='text-primary hover:underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </>
    );
};

export default LoginPageCard;
