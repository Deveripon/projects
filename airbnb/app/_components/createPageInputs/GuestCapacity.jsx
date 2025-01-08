import { cn } from "@/utils/cn";
import { useCallback, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import EditIcon from "./EditIcon";

const GuestCapacity = ({
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
                <div className='flex items-center text-gray-600'>
                    <input
                        type='number'
                        value={value}
                        placeholder={value || "How many Guest can Stay?"}
                        name='guest_capacity'
                        onChange={(e) => {
                            handleChange(
                                "guest_capacity",
                                parseInt(e.target.value)
                            );
                            onErrorClose("guest_capacity");
                        }}
                        className={cn(
                            `text-zinc-800 border-2 rounded border-primary font-bold text-md outline-primary`,
                            error && "border-2 border-red-500 rounded"
                        )}
                    />
                    <button
                        onClick={() => handleSave("guest_capacity")}
                        className='flex justify-center items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90'>
                        {" "}
                        <FaSave /> Save
                    </button>
                </div>
            ) : (
                <div className='flex items-center text-gray-600'>
                    <span className='edit flex items-center gap-2 text-zinc-500'>
                        <FaPerson />
                        How many Guest can Stay?
                        <span className='mx-3 font-bold p-1 border-2 border-gray-400 rounded'>
                            {value}
                        </span>
                        <button
                            onClick={() => handleEdit("guest_capacity")}
                            className='edit-button'>
                            <EditIcon size={15} />
                        </button>
                    </span>
                </div>
            )}
        </>
    );
};

export default GuestCapacity;
