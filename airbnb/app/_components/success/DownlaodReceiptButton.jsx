"use client";
import { createInvoice } from "@/app/(backend)/_invoice/invoice";
import { cn } from "@/utils/cn";
import { FaDownload } from "react-icons/fa";
const DownlaodReceiptButton = ({ bookinginfo, classname }) => {
    return (
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
                onClick={() => createInvoice(bookinginfo)}
                className={cn(
                    `px-6 py-3 bg-primary flex text-white rounded-lg hover:brightness-90`,
                    classname
                )}>
                <FaDownload className='mr-2' />
                Download Receipt
            </button>
        </div>
    );
};

export default DownlaodReceiptButton;
