"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ReviewForm } from "./ReviewForm";

const WriteReviewButton = ({ hotelData }) => {
    const { data } = useSession();
    const [show, setShow] = useState(false);
    function handleClose() {
        setShow(false);
    }
    return (
        <>
            <button
                onClick={() => setShow(true)}
                className='px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100'>
                Write a Review
            </button>
            {show &&
                createPortal(
                    <ReviewForm
                        user={data?.user?.id}
                        hotelInfo={hotelData?.data}
                        onClose={handleClose}
                    />,
                    document.body
                )}
        </>
    );
};

export default WriteReviewButton;
