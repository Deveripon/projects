import BookingSection from "@/app/_components/bookings/BookingSection";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa6";
export default function BookingPage({ searchParams, params: { hotelId } }) {
    if (!searchParams?.checkin || !searchParams?.checkout) {
        redirect(`/hotel/${hotelId}`);
    }

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            {/* Back Button */}
            <div className='mb-8'>
                <Link
                    href={`/hotel/${hotelId}`}
                    className='text-zinc-800 flex justify-start gap-2 items-center hover:underline'>
                    <FaChevronLeft />
                    Request to book
                </Link>
            </div>

            {/* Main Content Grid */}
            <Suspense fallback='Loading...'>
                <BookingSection hotelId={hotelId} />
            </Suspense>
        </div>
    );
}
