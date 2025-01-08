import { auth } from "@/auth";
import Rating from "./Rating";
import ReviewList from "./ReviewList";
import WriteReviewButton from "./WriteReviewButton";

const ReviewSection = async ({ hotelData }) => {
    const session = await auth();
    const reviewPromise = await fetch(
        `${
            process.env.API_BASE_URL
        }/reviews?hotel=${hotelData?.data?._id?.toString()}`,
        {
            next: { revalidate: 0 },
        }
    );
    const reviews = await reviewPromise.json();
    if (reviews?.success === false && reviews?.error) {
        throw new Error(reviews?.error?.message);
    }

    // check that user is eligable or not to submit review
    /**
     * is not property owner
     * is not reviewd yet
     * is have booking to this hotel
     */

    const isUserThisPropertyOwner =
        session?.user?.id === hotelData?.data?.host?._id?.toString();

    const isUserSubmittedReview =
        reviews?.data?.length > 0 &&
        reviews?.data?.find(
            (review) => review?.user?._id?.toString() === session?.user?.id
        );

    const isUserBookedThisProperty =
        hotelData?.data?.bookings?.length > 0 &&
        hotelData?.data?.bookings?.find(
            (booking) => booking?.user === session?.user?.id
        );

    const isUserEligableToReview =
        !isUserThisPropertyOwner &&
        !isUserSubmittedReview &&
        isUserBookedThisProperty;

    return (
        <div className='max-w-7xl mx-auto px-6 py-12 border-t'>
            {/* Reviews Header with Average Rating */}
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-4'>
                    <h2 className='text-2xl font-semibold'>Reviews</h2>
                    {reviews?.data?.length > 0 ? (
                        <div className='flex items-center'>
                            <Rating ratings={reviews?.data} />
                            <span className='mx-2'>·</span>
                            <span className='text-gray-600'>
                                {reviews?.data?.length} reviews
                            </span>
                        </div>
                    ) : (
                        <span className='text-gray-600'>
                            No reviews available
                        </span>
                    )}
                </div>
                {isUserEligableToReview && (
                    <WriteReviewButton hotelData={hotelData} />
                )}
                {isUserSubmittedReview && (
                    <p className='text-xs text-gray-600 px-4 py-1 rounded'>
                        ℹ️ You already submitted your review to this property
                    </p>
                )}
            </div>
            <ReviewList hotelData={hotelData} reviews={reviews?.data} />
        </div>
    );
};

export default ReviewSection;
