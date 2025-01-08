import { cn } from "@/utils/cn";

const BillingAddress = ({
    billingAddress,
    setBillingAddress,
    register,
    errors,
    clearErrors,
}) => {
    return (
        <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>Billing address</h2>
            <div className='space-y-4'>
                {errors?.street && (
                    <p className='text-red-500 text-sm -mb-3'>
                        {errors?.street?.message}
                    </p>
                )}
                <input
                    {...register("street", {
                        required: "Enter street address",
                    })}
                    name='street'
                    id='street'
                    value={billingAddress?.street}
                    onChange={(e) => {
                        clearErrors("street");
                        setBillingAddress((info) => ({
                            ...info,
                            street: e.target.value,
                        }));
                    }}
                    type='text'
                    placeholder='Street address'
                    className={cn(
                        `w-full p-3 border rounded-lg`,
                        errors?.street &&
                            " focus:border-red-500 outline-2 outline-red-500 border-red-500 border-2 rounded"
                    )}
                />

                <input
                    {...register("house_number")}
                    name='house_number'
                    id='house_number'
                    value={billingAddress?.house_number}
                    onChange={(e) =>
                        setBillingAddress((info) => ({
                            ...info,
                            house_number: e.target.value,
                        }))
                    }
                    type='text'
                    placeholder='Apertment or House Number'
                    className='w-full p-3 border rounded-lg'
                />

                <div className='group'>
                    {errors?.city && (
                        <p className='text-red-500 text-sm '>
                            {errors?.city?.message}
                        </p>
                    )}
                    <input
                        {...register("city", {
                            required: "Enter your city",
                        })}
                        name='city'
                        id='city'
                        value={billingAddress?.city}
                        onChange={(e) => {
                            clearErrors("city");
                            setBillingAddress((info) => ({
                                ...info,
                                city: e.target.value,
                            }));
                        }}
                        type='text'
                        placeholder='City'
                        className={cn(
                            `w-full p-3 border rounded-lg`,
                            errors?.city &&
                                " focus:border-red-500 outline-2 outline-red-500 border-red-500 border-2 rounded"
                        )}
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='group'>
                        {errors?.state && (
                            <p className='text-red-500 text-sm '>
                                {errors?.state?.message}
                            </p>
                        )}
                        <input
                            {...register("state", {
                                required: "Enter your state",
                            })}
                            name='state'
                            id='state'
                            value={billingAddress?.state}
                            onChange={(e) => {
                                clearErrors("city");
                                setBillingAddress((info) => ({
                                    ...info,
                                    state: e.target.value,
                                }));
                            }}
                            type='text'
                            placeholder='State'
                            className={cn(
                                ` p-3 border rounded-lg`,
                                errors?.state &&
                                    " focus:border-red-500 outline-2 outline-red-500 border-red-500 border-2 rounded"
                            )}
                        />
                    </div>
                    <div className='group'>
                        {errors?.zip && (
                            <p className='text-red-500 text-sm'>
                                {errors?.zip?.message}
                            </p>
                        )}
                        <input
                            {...register("zip", {
                                required: "Zip code is Required",
                                pattern: {
                                    value: /^\d{5}(-\d{5})?$/,
                                    message:
                                        "ZIP code must be in the format 12345 or 12345-6789.",
                                },
                            })}
                            name='zip'
                            id='zip'
                            value={billingAddress?.zip}
                            onChange={(e) => {
                                clearErrors("zip"); // Clear validation error on input
                                setBillingAddress((info) => ({
                                    ...info,
                                    zip: e.target.value,
                                }));
                            }}
                            type='text'
                            placeholder='ZIP code'
                            className={`p-3 border rounded-lg ${
                                errors?.zip
                                    ? "focus:border-red-500 outline-2 outline-red-500 border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BillingAddress;
