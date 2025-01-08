"use client";

import { useParams } from "next/navigation";

const NotFound = () => {
    const { hotelId } = useParams();
    return (
        <div>
            <h1>Hotel with id {hotelId} not found</h1>
        </div>
    );
};

export default NotFound;
