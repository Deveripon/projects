import { ImageResponse } from "next/og";
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const title = searchParams.get("title");
    const age = searchParams.get("age");

    return new ImageResponse(
        (
            <h1>
                {age}
                {title}{" "}
            </h1>
        ),
        {
            width: 1200,
            height: 600,
        }
    );
}
