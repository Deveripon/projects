import BookingItem from "@/app/_components/bookings/BookingItem";
import NoBookingFound from "@/app/_components/bookings/NoBookingFound";
import { auth } from "@/auth";

export default async function MyBookingsPage() {
    const session = await auth();
    const response = await fetch(
        `${process.env.API_BASE_URL}/users-activity-details/${session?.user?.id}`,
        { next: { revalidate: 0 } }
    );

    const data = await response.json();

    return (
        <div className=' min-h-[calc(100vh-270px)] max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>My Bookings</h1>
            <div className='space-y-4'>
                {data?.data?.bookings?.length > 0 ? (
                    data?.data?.bookings?.map((booking) => (
                        <BookingItem
                            key={booking?._id?.toString()}
                            booking={booking}
                        />
                    ))
                ) : (
                    <NoBookingFound />
                )}
            </div>
        </div>
    );
}
