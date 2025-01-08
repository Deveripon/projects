export async function doReservation(paylaod) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`,
            {
                method: "POST",
                body: JSON.stringify(paylaod),
            }
        );
        const result = await response.json();
        if (!response.ok) {
            return {
                success: false,
                result,
            };
        }
        console.log(`result from server action`, result);

        const sendMail = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-email`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: result?.data.booking?._id,
                    to: result?.data?.user?.email,
                    guestName: result?.data?.user?.name,
                    hotelName: result?.data?.hotel?.name,
                    checkInDate: result?.data?.booking?.checkin,
                    checkOutDate: result?.data?.booking?.checkout,
                    guestCount: result?.data?.booking?.guests,
                    totalPrice: result?.data?.booking?.total_payable,
                    hotelWebsite: "https://lws-x-airbnb.vercel.app",
                    hotelContact: `devripon.io@gmail.com`,
                    thumbnail: result?.data?.hotel?.thumbnail,
                }),
            }
        );

        return {
            success: true,
            message: "Booking Success",
            data: result?.data,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}
