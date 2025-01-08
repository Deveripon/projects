import { cn } from "@/utils/cn";
import { useCallback, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import EditIcon from "./EditIcon";

const PropertyPrice = ({
    isEditMode,
    handleChange,
    handleSave,
    handleEdit,
    value,
    error,
    onErrorClose,
}) => {

    return (
        <>
            {error && <p className='text-sm text-red-500'>*{error}</p>}
            {isEditMode ? (
                <div className='input-field flex items-center gap-2'>
                    <input
                        type='number'
                        value={value}
                        placeholder={value || "Price in USD"}
                        name='rate'
                        onChange={(e) => {
                            handleChange("rate", parseInt(e.target.value));
                            onErrorClose("rate");
                        }}
                        className={cn(
                            `text-zinc-800 border-2 rounded border-primary font-bold text-md outline-primary`,
                            error && `border-red-500 border-2 rounded`
                        )}
                    />
                    <button
                        onClick={() => handleSave("rate")}
                        className='flex justify-center items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90'>
                        {" "}
                        <FaSave /> Save
                    </button>
                </div>
            ) : (
                <div className='mb-4'>
                    <span className=' text-gray-600 text-xl font-bold edit'>
                        Price in USD
                        <span className='mx-3 font-bold p-1 border-2 border-gray-400 rounded'>
                            {value}
                        </span>
                    </span>

                    <button
                        onClick={() => handleEdit("rate")}
                        className='edit-button ml-2'>
                        <EditIcon />
                    </button>
                    <span className='text-zinc-500 ml-1'>per night</span>
                </div>
            )}
        </>
    );
};

export default PropertyPrice;