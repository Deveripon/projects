import {
    FaDumbbell,
    FaSink,
    FaSwimmer,
    FaUmbrellaBeach,
    FaWifi,
} from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";

const AmenitiesList = ({ handleAmenityChange, data }) => {
    return (
        <div className='grid grid-cols-2 gap-4' id='amenities'>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input
                    onChange={() => handleAmenityChange("Beach access")}
                    checked={data.amenities.includes("Beach access")}
                    type='checkbox'
                    className='accent-primary w-4 h-4'
                    name='amenities'
                    value='Beach access'
                />

                <span className='flex items-center gap-2'>
                    {" "}
                    <FaUmbrellaBeach /> Beach access
                </span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input
                    onChange={() => handleAmenityChange("Private pool")}
                    checked={data.amenities.includes("Private pool")}
                    type='checkbox'
                    className='accent-primary w-4 h-4'
                    name='amenities'
                    value='Private pool'
                />

                <span className='flex items-center gap-2'>
                    <FaSwimmer />
                    Private pool
                </span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input
                    onChange={() => handleAmenityChange("Free Wi-Fi")}
                    checked={data.amenities.includes("Free Wi-Fi")}
                    type='checkbox'
                    className='accent-primary w-4 h-4'
                    name='amenities'
                    value='Free Wi-Fi'
                />

                <span className='flex items-center gap-2'>
                    {" "}
                    <FaWifi />
                    Free Wi-Fi
                </span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input
                    onChange={() => handleAmenityChange("Kitchen")}
                    checked={data.amenities.includes("Kitchen")}
                    type='checkbox'
                    className='accent-primary w-4 h-4'
                    name='amenities'
                    value='Kitchen'
                />

                <span className='flex items-center gap-2'>
                    <FaSink />
                    Kitchen
                </span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input
                    onChange={() => handleAmenityChange("Free Parking")}
                    checked={data.amenities.includes("Free Parking")}
                    type='checkbox'
                    className='accent-primary w-4 h-4'
                    name='amenities'
                    value='Free Parking'
                />

                <span className='flex items-center gap-2'>
                    <FaSquareParking />
                    Free Parking
                </span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input
                    onChange={() => handleAmenityChange("Fitness Center")}
                    checked={data.amenities.includes("Fitness Center")}
                    type='checkbox'
                    className='accent-primary w-4 h-4'
                    name='amenities'
                    value='Fitness Center'
                />

                <span className='flex items-center gap-2'>
                    <FaDumbbell />
                    Fitness Center
                </span>
            </label>
        </div>
    );
};

export default AmenitiesList;
