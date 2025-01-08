import Image from "next/image";

const HotelGallery = ({ images }) => {
    const newGallery = [...images];
    newGallery.shift();
    return (
        <div className='grid grid-cols-4 grid-rows-2 gap-4 mb-8 h-[500px]'>
            <div className='col-span-2 row-span-2'>
                <Image
                    height={700}
                    width={700}
                    src={images[0]}
                    alt='Main Room'
                    className='w-full h-full object-cover rounded-lg'
                />
            </div>
            {newGallery.map((image, index) => (
                <div key={index} className='relative'>
                    <Image
                        width={500}
                        height={500}
                        src={image}
                        alt='Others Room'
                        className='w-full h-full object-cover rounded-lg'
                    />
                </div>
            ))}
        </div>
    );
};

export default HotelGallery;
