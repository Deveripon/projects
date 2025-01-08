"use client";
import usePopup from "@/hooks/usePopup";
import { useReservation } from "@/hooks/useReservation";
import { formatDate } from "@/utils";
import { cn } from "@/utils/cn";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import DateRangePicker from "../bookings/DateRangePicker";
import Rating from "../reviews/Rating";

const BookingCard = ({ info }) => {
    const { data } = useSession();
    const ref = useRef();
    const { reservationData, setReservationData } = useReservation();
    const { togglePopup, show, setShow } = usePopup(ref);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // trigger checkout
    function handleGoToCheckout() {
        const params = new URLSearchParams(searchParams);
        if (reservationData?.checkin && reservationData?.checkout) {
            params.set("checkin", formatDate(reservationData?.checkin));
            params.set("checkout", formatDate(reservationData?.checkout));
            params.set("totalDays", reservationData?.totalDays);
            params.set("guest", reservationData?.guest || 1);
            router.replace(`${pathname}/checkout?${params.toString()}`);
        } else {
            alert("Select checkin and checkout date to reserve");
        }
    }

    // use localdata if user already add seletion
    useEffect(() => {
        const savedData = JSON.parse(localStorage?.getItem("reservationData"));
        if (savedData?.hotelId === info?._id.toString()) {
            setReservationData({ ...savedData });
        } else {
            setReservationData({
                hotelId: "",
                checkin: "",
                checkout: "",
                totalDays: "",
                guest: "",
                hotelInfo: {},
            });
        }
    }, [info?._id, setReservationData]);

    return (
        <div
            className={cn(
                data?.user?.id === info?.host?._id.toString() &&
                    "pointer-events-none"
            )}>
            <div className='bg-white shadow-lg rounded-xl p-6 border'>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <span className='text-xl font-bold'>${info?.rate}</span>
                        <span className='text-gray-600 ml-1'>per night</span>
                    </div>

                    <Rating ratings={info?.reviews} />
                </div>

                <div ref={ref} className='border rounded-lg mb-4 relative'>
                    {(reservationData?.checkin ||
                        reservationData?.checkout) && (
                        <button
                            className=' absolute top-9 right-5 text-gray-600 bg-gray-200 border-gray-300 border hover:bg-gray-300 transform duration-200 px-2 py-[3px] text-xs rounded-full'
                            onClick={() =>
                                setReservationData((data) => ({
                                    ...data,
                                    checkin: "",
                                    checkout: "",
                                }))
                            }>
                            Clear Dates
                        </button>
                    )}
                    <div className='grid grid-cols-2 border-b'>
                        <input
                            onClick={() => setShow(true)}
                            value={
                                reservationData?.checkin &&
                                formatDate(reservationData?.checkin)
                            }
                            readOnly
                            placeholder='Check in'
                            className='p-3 border-r'
                        />
                        <input
                            onClick={() => setShow(true)}
                            value={
                                reservationData?.checkout &&
                                formatDate(reservationData?.checkout)
                            }
                            readOnly
                            placeholder='Check out'
                            className='p-3'
                        />
                    </div>
                    {show && (
                        <div className='date-picker'>
                            <DateRangePicker
                                checkin={reservationData?.checkin}
                                checkout={reservationData?.checkout}
                                setReservationData={setReservationData}
                                bookedDays={info?.bookings}
                            />
                        </div>
                    )}
                    <input
                        value={reservationData?.guest}
                        onChange={(e) =>
                            setReservationData({
                                ...reservationData,
                                guest: parseInt(e.target.value),
                            })
                        }
                        max={info?.guest_capacity}
                        min={0}
                        type='number'
                        placeholder={`Guests | Maximum capacity is ${info?.guest_capacity} `}
                        className='w-full p-3 mt-2'
                    />
                </div>

                <button
                    onClick={handleGoToCheckout}
                    className={cn(
                        `w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90`,
                        data?.user?.id.toString() ===
                            info?.host?._id.toString() &&
                            "pointer-events-none  bg-gray-400",
                        !reservationData?.checkin &&
                            !reservationData?.checkout &&
                            "pointer-events-none bg-teal-600/50"
                    )}>
                    Reserve
                </button>

                <div className='text-center mt-4 text-gray-600'>
                    {data?.user?.id.toString() ===
                    info?.host?._id.toString() ? (
                        <p>You created this property</p>
                    ) : (
                        <p>You won&apos;t be charged yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;