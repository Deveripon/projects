import { FaSwimmer, FaUmbrellaBeach } from "react-icons/fa";
import { FaDumbbell, FaSink, FaSquareParking, FaWifi } from "react-icons/fa6";
const Amenities = ({ amenities }) => {

    function getAmenitiesIcon(amenities) {
        let amenetiesIcon;
        switch (amenities) {
            case "Beach access":
                amenetiesIcon = <FaUmbrellaBeach />;
                break;
            case "Private pool":
                amenetiesIcon = <FaSwimmer />;
                break;
            case "Kitchen":
                amenetiesIcon = <FaSink />;
                break;
            case "Free Wi-Fi":
                amenetiesIcon = <FaWifi />;
                break;
            case "Free Parking":
                amenetiesIcon = <FaSquareParking />;
                break;
            case "Fitness Center":
                amenetiesIcon = <FaDumbbell />;
                break;
        }
        return amenetiesIcon;
    }

    return (
        <div>
            <h3 className='text-xl font-semibold mb-4'>
                What this place offers
            </h3>
            <div className='grid grid-cols-2 gap-4'>
                {amenities.map((amenity, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <div className='flex items-center justify-center gap-2 pt-2'>
                            {getAmenitiesIcon(amenity)}
                            <span>{amenity}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Amenities;
