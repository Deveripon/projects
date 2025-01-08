import LoginPageCard from "@/app/_components/auth/LoginPageCard";

export default function LoginPage() {
    return (
        <div className='fixed inset-0 bg-teal-800 flex items-center justify-center'>
            <div className='bg-white rounded-xl shadow-xl w-96 p-6 relative shadow-black/50'>
                <LoginPageCard />
            </div>
        </div>
    );
}
