import Image from "next/image";
import Rating from "../reviews/Rating";

const BookingDetailsCard = ({ bookinginfo }) => {
    console.log(bookinginfo);

    return (
        <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
            <div className='flex items-start gap-6 mb-6 pb-6 border-b'>
                <Image
                    width={200}
                    height={200}
                    src={bookinginfo?.hotel?.thumbnail}
                    alt={bookinginfo?.hotel?.name}
                    className='w-32 h-32 rounded-lg object-cover'
                />
                <div>
                    <h2 className='text-2xl font-semibold mb-2'>
                        {bookinginfo?.hotel?.name}
                    </h2>
                    <div className='flex items-center mb-2 text-gray-600'>
                        <Rating ratings={bookinginfo?.hotel?.reviews} />
                        {bookinginfo?.hotel?.reviews?.length > 0 ? (
                            <span className='text-md text-gray-600'>{`(${bookinginfo?.hotel?.reviews?.length}+ reviews)`}</span>
                        ) : (
                            <span className='text-md text-gray-600 ml-2'>
                                No reviews availble
                            </span>
                        )}
                    </div>
                    <p className='text-zinc-600 text-clip line-clamp-2'>
                        {bookinginfo?.hotel?.description}
                    </p>
                </div>
            </div>
            {/* Reservation Details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h3 className='font-semibold mb-4'>Reservation Details</h3>
                    <div className='space-y-3'>
                        <div className='flex justify-between'>
                            <span className='text-zinc-600 text-sm'>
                                Check-in
                            </span>
                            <span className='text-zinc-500 text-sm'>
                                {bookinginfo?.checkin}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-zinc-600 text-sm'>
                                Check-out
                            </span>
                            <span className='text-zinc-500 text-sm'>
                                {bookinginfo?.checkout}
                            </span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='text-zinc-600 text-sm'>
                                Guests
                            </span>
                            <span className='text-zinc-500 text-sm'>
                                {bookinginfo?.guests} guest
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='font-semibold mb-4'>Payment Summary</h3>
                    <div className='space-y-3'>
                        <div className='flex justify-between'>
                            <span className='text-zinc-600'>
                                Total amount paid
                            </span>
                            <span className='font-semibold'>
                                ${bookinginfo?.total_payable}
                            </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-zinc-600 text-sm'>
                                Booking ID
                            </span>
                            <span>#{bookinginfo?._id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsCard;
