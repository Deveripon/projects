import Image from "next/image";
import Rating from "../reviews/Rating";

const HotelCard = ({ hotelInfo }) => {
    return (
        <div>
            <div className='relative'>
                <Image
                    src={hotelInfo?.thumbnail}
                    alt={hotelInfo?.name}
                    width={400}
                    height={400}
                    className='w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform'
                />
                <div className='absolute top-3 right-3 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold'>
                    <i className='ph-bed inline-block mr-1' />
                    {hotelInfo?.bedrooms} Bedrooms
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-bold text-lg'>{hotelInfo?.name}</h3>
                    <Rating ratings={hotelInfo?.reviews} />
                </div>
                <p className='text-zinc-500 text-sm mt-1'>
                    {hotelInfo?.location}
                </p>
                <div className='mt-2 flex justify-between items-center'>
                    <div>
                        <span className='font-bold'>${hotelInfo?.rate}</span>
                        <span className='text-zinc-500 text-sm'>
                            {" "}
                            per night
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
