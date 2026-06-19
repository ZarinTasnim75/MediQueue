"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/jwt-utils";

const CancelButton = ({ id, onCancel }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        setLoading(true);
        const token = getAuthToken();

        if (!token) {
            toast.error("Please login again to cancel booking");
            setOpen(false);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                console.error("Fetch failed:", res.status);
                return [];
            }

            const data = await res.json().catch(() => null);

            if (res.ok) {
                toast.success("Booking cancelled");
                setOpen(false);

                if (onCancel) onCancel();
            } else {
                toast.error(data?.message || "Failed to cancel");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="btn btn-error btn-sm">
                Cancel
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[300px] text-center space-y-4">
                        <h2 className="text-lg font-bold">Cancel Booking?</h2>
                        <p className="text-sm text-gray-500">This action cannot be undone.</p>

                        <div className="flex justify-center gap-3">
                            <button onClick={() => setOpen(false)} className="btn btn-sm" disabled={loading} >
                                No
                            </button>
                            <button onClick={handleCancel} className="btn btn-error btn-sm" disabled={loading} >
                                {loading ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CancelButton;