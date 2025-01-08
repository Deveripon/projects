import { userModel } from "@/models/users-model";
import { connectMongoDB } from "@/service/mongoConnection";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";
import { loginSchema } from "../../../_zod_schema/loginSchema";

export async function POST(req) {
    try {
        await connectMongoDB();
        const data = await req.json();
        // add zod validation
        const validatedData = loginSchema.parse(data);
        const user = await userModel.findOne({ email: validatedData.email });
        if (!user) {
            throw new Error("Email or password is incorrect");
        }
        const matched = compareSync(validatedData.password, user.password);
        if (!matched) {
            throw new Error("Email or password is incorrect");
        }

        // generate tokens
        const accessToken = jwt.sign(
            { id: user?._id.toString(), name: user?.name, email: user?.email },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN }
        );
        const refreshToken = jwt.sign(
            { id: user?.id.toString(), name: user?.name, email: user?.email },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Login Successful!",
                user,
                tokens: {
                    accessToken,
                    refreshToken,
                },
            },
            { status: 200 }
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
                {
                    success: false,
                    error: fieldErrors,
                },
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
