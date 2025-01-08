"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <h4>{error?.message ? error?.message : error}</h4>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
