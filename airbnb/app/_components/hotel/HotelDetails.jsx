import { FaBed } from "react-icons/fa";
import { FaDoorOpen, FaPerson } from "react-icons/fa6";
import Amenities from "./Amenities";
const HotelDetails = ({ info }) => {
    return (
        <div className='col-span-2'>
            <div className='border-b pb-6 mb-6'>
                <h2 className='text-2xl font-semibold mb-4'>
                    {info?.name} hosted by {info?.host?.name}
                </h2>
                <div className='grid grid-cols-3 gap-4 text-gray-600'>
                    <div className='flex items-center gap-2'>
                        <FaPerson />
                        <span>{info?.guest_capacity} guests</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaDoorOpen />
                        <span>{info?.bedrooms} bedrooms</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaBed />
                        <span>{info?.beds} beds</span>
                    </div>
                </div>
            </div>
            {/* Description */}
            <div className='mb-6'>
                <h3 className='text-xl font-semibold mb-4'>About this place</h3>
                <p className='text-gray-700 leading-relaxed'>
                    {info?.description}
                </p>
            </div>
            {info?.amenities?.length > 0 && (
                <Amenities amenities={info?.amenities} />
            )}
        </div>
    );
};

export default HotelDetails;
