import { userModel } from "@/models/users-model";
import { connectMongoDB } from "@/service/mongoConnection";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { userSchema } from "../../../_zod_schema/userSchema";

export async function POST(req) {
    try {
        await connectMongoDB();
        const data = await req.json();
        // validate the request
        const validatedData = userSchema.parse(data);
        const hashedPassword = hashSync(validatedData?.password, 10);
        const user = await userModel.create({
            ...validatedData,
            password: hashedPassword,
        });
        return NextResponse.json(
            {
                success: true,
                message: "Registration Successful!",
                data: user,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            // transform error into object with properties
            const fieldErrors = error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});

            // return zod validation error
            return NextResponse.json(
                { success: false, error: fieldErrors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: error?.message,
                },
            },
            { status: 500 }
        );
    }
}
