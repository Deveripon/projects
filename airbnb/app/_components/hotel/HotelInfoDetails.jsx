import { Suspense } from "react";
import BookingCard from "../header/BookingCard";
import Rating from "../reviews/Rating";
import HotelDetails from "./HotelDetails";
import HotelGallery from "./HotelGallery";

const HotelInfoDetails = ({ hotelData }) => {
    const info = hotelData?.data;

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            {/* Property Title and Rating */}
            <div className='mb-6'>
                <h1 className='text-3xl font-bold mb-2'>{info?.name}</h1>
                <div className='flex items-center text-gray-600'>
                    <Rating ratings={info?.reviews} />
                    <span className='mx-2'>·</span>
                    <span className='ml-2'>
                        {info?.reviews?.length
                            ? `${info?.reviews?.length} reviews`
                            : `No reviews available`}
                    </span>
                    <span className='mx-2'>·</span>
                    <span className=''>{info?.location}</span>
                </div>
            </div>

            <HotelGallery images={info?.gallery} />

            <div className='grid grid-cols-3 gap-8'>
                <HotelDetails info={info} />
                <Suspense fallback='Loading...'>
                    <BookingCard info={info} />
                </Suspense>
            </div>
        </div>
    );
};

export default HotelInfoDetails;
