"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/jwt-utils";

const DeleteTutor = ({ id, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const token = getAuthToken();
        
        if (!token) {
            toast.error("Please login again to delete tutor");
            setOpen(false);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
            });

            if (res.ok) {
                toast.success("Tutor deleted successfully");
                setOpen(false);
                onDelete?.();
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.message || "Delete failed");
            }
        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="btn btn-error btn-sm" > Delete</button>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[320px] text-center space-y-4">

                        <h2 className="text-lg font-bold text-[#EC6530]"> Delete Tutor? </h2>

                        <p className="text-sm text-gray-500"> This action cannot be undone. </p>

                        <div className="flex justify-center gap-3">
                            <button onClick={() => setOpen(false)} className="btn btn-sm" > Cancel </button>

                            <button onClick={handleDelete} className="btn btn-error btn-sm" disabled={loading}>
                             {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Yes Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteTutor;