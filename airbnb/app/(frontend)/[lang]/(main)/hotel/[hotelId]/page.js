import HotelInfoDetails from "@/app/_components/hotel/HotelInfoDetails";
import ReviewSection from "@/app/_components/reviews/ReviewSection";
import ReviewsLoadingSkeleton from "@/app/_components/skelitons/ReviewLoadingSkeliton";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function HotelDetailsPage({ params: { hotelId } }) {
    const hotelPromise = await fetch(
        `${process.env.API_BASE_URL}/hotels/${hotelId}`,
        {
            next: { revalidate: 0 },
        }
    );

    const hotel = await hotelPromise.json();
    if (hotel && hotel?.data === null) {
        notFound();
    }
    if (hotel?.success === false && hotel?.error) {
        throw new Error(hotel?.error?.message);
    }

    return (
        <>
            <HotelInfoDetails hotelData={hotel} />

            <Suspense fallback={<ReviewsLoadingSkeleton />}>
                <ReviewSection hotelData={hotel} />
            </Suspense>
        </>
    );
}
