import { cn } from "@/utils/cn";
import { useCallback, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { FaRestroom } from "react-icons/fa6";
import EditIcon from "./EditIcon";

const AvailableRooms = ({
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
            {error && <p className='text-sm text-red-500'>{error}</p>}
            {isEditMode ? (
                <div className='flex items-center text-gray-600'>
                    <input
                        type='number'
                        value={value}
                        placeholder={value || "Available rooms"}
                        name='rooms'
                        onChange={(e) => {
                            handleChange("rooms", parseInt(e.target.value));
                            onErrorClose("rooms");
                        }}
                        className={cn(
                            `text-zinc-800 border-2 rounded border-primary font-bold text-md outline-primary`,
                            error && "border-2 border-red-500 rounded"
                        )}
                    />
                    <button
                        onClick={() => handleSave("rooms")}
                        className='flex justify-center items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90'>
                        {" "}
                        <FaSave /> Save
                    </button>
                </div>
            ) : (
                <div className=' mb-2 flex items-center text-gray-600'>
                    <span className='edit flex items-center gap-2 text-zinc-500'>
                        <FaRestroom />
                        Available rooms
                        <span className='mx-3 font-bold p-1 border-2 border-gray-400 rounded'>
                            {value}
                        </span>
                        <button
                            onClick={() => handleEdit("rooms")}
                            className='edit-button'>
                            <EditIcon size={15} />
                        </button>
                    </span>
                </div>
            )}
        </>
    );
};

export default AvailableRooms;
