import HotelManageCard from "@/app/_components/hotel/HotelManageCard";
import NoHotelData from "@/app/_components/hotel/NoHotelData";
import { auth } from "@/auth";
import Link from "next/link";

export default async function HotelManagePage() {
    const session = await auth();
    const response = await fetch(
        `${process.env.API_BASE_URL}/users-activity-details/${session?.user?.id}`,
        { next: { revalidate: 0 } }
    );

    const data = await response.json();
    console.dir(JSON.stringify(data));

    return (
        <div>
            <div className='max-w-7xl mx-auto px-4 pb-8 min-h-[calc(100vh-270px)]'>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-zinc-800'>
                        Manage Hotels
                    </h1>
                    <Link
                        href='/manage-hotels/create'
                        className='bg-primary text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors'>
                        + Create Hotel
                    </Link>
                </div>

                {data?.data?.hotels?.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data?.data?.hotels?.map((hotel) => (
                            <HotelManageCard
                                key={hotel?._id.toString()}
                                hotel={hotel}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <NoHotelData>
                            <div className='group flex justify-center items-center flex-col gap-2'>
                                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                                    No Property Found
                                </h2>
                                <p className='text-zinc-500 text-sm'>
                                    You haven&apos;t added any Property yet.
                                </p>
                                <Link
                                    href='/manage-hotels/create'
                                    className='bg-gray-400 w-40  text-white px-4 py-2 rounded-lg hover:brightness-90 transition-colors'>
                                    + Create Now
                                </Link>
                            </div>
                        </NoHotelData>
                    </>
                )}
            </div>
        </div>
    );
}
