"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const CancelButton = ({ id, onCancel }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/bookings/${id}`, {
                method: "PATCH",
            });

            const data = await res.json().catch(() => null);

            if (res.ok) {
                toast.success("Booking cancelled");
                setOpen(false);

                if (onCancel) onCancel();
            } else {
                toast.error(data.message || "Failed to cancel");
            }
        } catch (error) {
            toast.error(error.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="btn btn-error btn-sm" > Cancel </button>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[300px] text-center space-y-4">

                        <h2 className="text-lg font-bold"> Cancel Booking? </h2>

                        <div className="flex justify-center gap-3">
                            <button onClick={() => setOpen(false)} className="btn btn-sm" >  No </button>
                            <button onClick={handleCancel} className="btn btn-error btn-sm" >Yes, Cancel </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CancelButton;