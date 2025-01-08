import RegisterPageCard from "@/app/_components/auth/RegisterPageCard";

export default function RegisterPage() {
    return (
        <div className='fixed inset-0 bg-teal-800 flex items-center justify-center'>
            <div className='bg-white rounded-xl shadow-xl w-96 p-6 relative shadow-black/50'>
                <RegisterPageCard />
            </div>
        </div>
    );
}
