import { cn } from "@/utils/cn";

const Payment = ({
    paymentInfo,
    setPaymentInfo,
    register,
    errors,
    clearErrors,
}) => {
    return (
        <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>
                Pay with American Express
            </h2>
            <div className='space-y-4'>
                {errors?.cardnumber && (
                    <p className='text-red-500 text-sm -mb-3'>
                        {errors?.cardnumber?.message}
                    </p>
                )}
                <input
                    {...register("cardnumber", {
                        required: "Please enter your card number",
                        validate: (value) =>
                            value.length === 13 ||
                            "Please enter a valid card number(length 13 digits)",
                    })}
                    name='cardnumber'
                    id='cardnumber'
                    value={paymentInfo?.cardnumber}
                    type='text'
                    onChange={(e) => {
                        clearErrors("cardnumber");
                        const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        setPaymentInfo((info) => ({
                            ...info,
                            cardnumber: value,
                        }));
                    }}
                    placeholder='Card number'
                    className={cn(
                        `w-full p-3 border rounded-lg`,
                        errors?.cardnumber &&
                            " focus:border-red-500 outline-2 outline-red-500 border-red-500 border-2 rounded"
                    )}
                />
                <div className='grid grid-cols-2 gap-4'>
                    <div className='group'>
                        {errors?.expiresIn && (
                            <p className='text-red-500 text-sm '>
                                {errors?.expiresIn?.message}
                            </p>
                        )}
                        <input
                            {...register("expiresIn", {
                                required: "Please enter card expiry",
                                pattern: {
                                    value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/,
                                    message:
                                        "Add valid expiry date format, e.g., DD-MM-YYYY (12-12-2026)",
                                },
                                validate: {
                                    notExpired: (value) => {
                                        // Parse the input date
                                        const [day, month, year] = value
                                            .split("-")
                                            .map(Number);
                                        const enteredDate = new Date(
                                            year,
                                            month - 1,
                                            day
                                        );
                                        const today = new Date();

                                        // Check if the date is in the future
                                        if (enteredDate <= today) {
                                            return "The card expiration date has expired.";
                                        }
                                        return true;
                                    },
                                },
                            })}
                            name='expiresIn'
                            id='expiresIn'
                            value={paymentInfo?.expiresIn || ""}
                            onChange={(e) => {
                                clearErrors("expiresIn");
                                setPaymentInfo((info) => ({
                                    ...info,
                                    expiresIn: e.target.value,
                                }));
                            }}
                            type='text'
                            placeholder='Expiration e.g., DD-MM-YYYY'
                            className={cn(
                                `p-3 border rounded-lg`,
                                errors?.expiresIn &&
                                    "focus:border-red-500 border-red-500 border-2 rounded"
                            )}
                        />
                    </div>

                    <div className='group'>
                        {errors?.cvv && (
                            <p className='text-red-500 text-sm '>
                                {errors?.cvv?.message}
                            </p>
                        )}
                        <input
                            {...register("cvv", {
                                required: "Enter cvv number",
                                validate: (value) =>
                                    value.length === 3 ||
                                    "Please enter a valid cvv number( length 3 digits)",
                            })}
                            id='cvv'
                            name='cvv'
                            value={paymentInfo?.cvv}
                            onChange={(e) => {
                                clearErrors("cvv");
                                const value = e.target.value.replace(/\D/g, "");
                                setPaymentInfo((info) => ({
                                    ...info,
                                    cvv: value,
                                }));
                            }}
                            type='text'
                            placeholder='CVV'
                            className={cn(
                                `p-3 border rounded-lg`,
                                errors?.cvv &&
                                    " focus:border-red-500 border-red-500 border-2 rounded"
                            )}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
