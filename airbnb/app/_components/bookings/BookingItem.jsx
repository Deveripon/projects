import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import DownlaodReceiptButton from "../success/DownlaodReceiptButton";

const BookingItem = async (booking) => {
    console.log(`booking id`, booking?.booking?._id);

    const response = await fetch(
        `${
            process.env.API_BASE_URL
        }/bookings/${booking?.booking?._id?.toString()}`,
        {
            next: { revalidate: 0 },
        }
    );

    const { data } = await response.json();
    return (
        <div className='bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow'>
            <div className='flex items-center space-x-4'>
                <Link href={`/hotel/${data?.hotel?._id.toString()}`}>
                    <Image
                        height={400}
                        width={600}
                        src={data?.hotel?.thumbnail}
                        alt={data?.hotel?.name}
                        className='w-24 h-24 object-cover rounded-md'
                    />
                </Link>
                <div>
                    <Link href={`/hotel/${data?.hotel?._id.toString()}`}>
                        <h2 className='text-lg text-zinc-800 font-semibold'>
                            {data?.hotel?.name}
                        </h2>
                    </Link>
                    <p className='text-zinc-500 text-sm'>
                        Booking Date: {formatDate(data?.createdAt)}
                    </p>
                    <p className='text-zinc-500 text-sm'>
                        Booking Code: #{data?._id?.toString()}
                    </p>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                    href={`/my-bookings/${data?._id?.toString()}`}
                    className='px-3 py-2  text-sm bg-primary text-white rounded-lg hover:brightness-90'>
                    View Trip Details
                </Link>

                <DownlaodReceiptButton
                    bookinginfo={data}
                    classname='px-3 flex items-center justify-center py-2 text-sm border bg-gray-100 text-gray-800 border-gray-300 rounded-lg hover:bg-gray-50'
                />
            </div>
        </div>
    );
};

export default BookingItem;
