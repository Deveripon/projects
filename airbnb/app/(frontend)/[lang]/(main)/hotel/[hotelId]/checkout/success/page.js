import BookingDetailsCard from "@/app/_components/success/BookingDetailsCard";
import DownlaodReceiptButton from "@/app/_components/success/DownlaodReceiptButton";
import NextSteps from "@/app/_components/success/NextSteps";
import SuccessMessage from "@/app/_components/success/SuccessMessage";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function ReservationSuccessPage({
    searchParams: { bookingId },
}) {
    const response = await fetch(
        `${process.env.API_BASE_URL}/bookings/${bookingId}`,
        {
            next: { revalidate: 0 },
        }
    );
    if (!response.ok) {
        return redirect("/");
    }

    console.log(`bookingid`, bookingId);

    const bookingInfo = await response.json();
    console.log(`booking info from success  page`, bookingInfo);

    return (
        <div className='bg-gray-50'>
            <div className='max-w-3xl mx-auto p-6'>
                {/* Success Message Section */}
                <SuccessMessage />
                {/* Booking Details Card */}
                <BookingDetailsCard bookinginfo={bookingInfo?.data} />
                {/* Next Steps */}
                <NextSteps />
                {/* Action Buttons */}
                {/* <button onClick={createInvoice}>Download Invoice</button> */}
                <DownlaodReceiptButton bookinginfo={bookingInfo?.data} />
                {/* Need Help Section */}
                <div className='mt-12 text-center'>
                    <p className='text-zinc-600'>
                        Need help with your booking?
                    </p>
                    <Link href='#' className='text-primary hover:underline'>
                        Visit our Help Center
                    </Link>
                </div>
            </div>
        </div>
    );
}
