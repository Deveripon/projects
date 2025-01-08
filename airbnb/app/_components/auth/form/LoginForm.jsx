"use client";

import { loginWithCredentials } from "@/app/_actions/authActions";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import FormDevider from "../FormDevider";
import GoogleSignInButton from "../GoogleSignInButton";
import InputFiled from "../InputFiled";
import PasswordFiled from "../PasswordFiled";

const LoginForm = () => {
    const [alert, setAlert] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm();

    async function onSubmit(data) {
        const response = await loginWithCredentials(data);

        if (response?.error) {
            setError("global", {
                type: "manual",
                message: response.error.message,
            });
            setAlert(true);
        }

        if (response?.success) {
            await getSession();
            router.push("/");
        } else {
            setError("global", {
                type: "manual",
                message: "Invalid username or password",
            });
        }
    }

    return (
        <>
            {alert && (
                <div className='global-error bg-red-500/80 border border-red-600 px-2 py-2 rounded-md flex items-center justify-between'>
                    <p className='text-white'>{errors?.global?.message}</p>
                    <button
                        onClick={() => {
                            setAlert(false);
                            clearErrors("global");
                        }}>
                        <MdOutlineClose />
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <InputFiled
                    register={{
                        ...register("email", {
                            required: "Email is Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        }),
                    }}
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Email'
                    error={errors?.email}
                />
                <PasswordFiled
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Password'
                    register={{
                        ...register("password", {
                            required: "Password field is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters long",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                message:
                                    "Password must contain at least one uppercase letter, one lowercase letter,and one number",
                            },
                        }),
                    }}
                    error={errors?.password}
                />
                <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition'>
                    Continue
                </button>
            </form>
            <FormDevider />
            <GoogleSignInButton disabled={isSubmitting} />
        </>
    );
};

export default LoginForm;
