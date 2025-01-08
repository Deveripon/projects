import { cn } from "@/utils/cn";
import { useCallback, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { SiCcleaner } from "react-icons/si";
import EditIcon from "./EditIcon";

const CleaningFee = ({
    isEditMode,
    handleChange,
    handleSave,
    handleEdit,
    value,
    onErrorClose,
    error,
}) => {

    return (
        <>
            {error && <p className='text-sm text-red-500'>*{error}</p>}
            {isEditMode ? (
                <div className='flex items-center text-gray-600'>
                    <input
                        type='number'
                        value={value}
                        placeholder={value || "Cleaning Fee ?"}
                        name='cleaning_fee'
                        onChange={(e) => {
                            handleChange(
                                "cleaning_fee",
                                parseInt(e.target.value)
                            );
                            onErrorClose("cleaning_fee");
                        }}
                        className={cn(
                            `text-zinc-800 border-2 rounded border-primary font-bold text-md outline-primary`,
                            error && "border-2 border-red-500 rounded"
                        )}
                    />
                    <button
                        onClick={() => handleSave("cleaning_fee")}
                        className='flex justify-center items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90'>
                        {" "}
                        <FaSave /> Save
                    </button>
                </div>
            ) : (
                <div className='flex items-center text-gray-600'>
                    <span className='edit flex items-center gap-2 text-zinc-500'>
                        <SiCcleaner /> Cleaning Fee ?
                        <span className='mx-3 font-bold p-1 border-2 border-gray-400 rounded'>
                            {value}
                        </span>
                        <button
                            onClick={() => handleEdit("cleaning_fee")}
                            className='edit-button'>
                            <EditIcon size={15} />
                        </button>
                    </span>
                </div>
            )}
        </>
    );
};

export default CleaningFee;
