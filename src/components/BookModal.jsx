"use client"

import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BookModal = ({ tutor, user, isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const formData = new FormData(e.currentTarget);

        const bookingData = Object.fromEntries(formData.entries());
        bookingData.bookStatus = tutor.totalSlot > 0 ? "Booked" : "No available slots left";
        console.log("Booking Data:", bookingData);

        try {
            const res = await fetch("http://localhost:5000/book-session",
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(bookingData),
                });

            const data = await res.json().catch(() => ({ message: "Server error" }));

            if (res.ok) {
                toast.success("Booking Successful");
                onClose();
                router.refresh();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Booking Failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6">
                <h3 className="font-bold text-2xl mb-6 text-center">Book Session</h3>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-left font-medium mb-1">
                            <span className="label-text">Student Name</span>
                        </label>
                        <input type="text" name="studentName" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block text-left font-medium mb-1">
                            <span className="label-text">Student Email</span>
                        </label>
                        <input type="email" name="studentEmail" value={user?.email ?? ""} className="input input-bordered w-full" readOnly />
                    </div>

                    <div>
                        <label className="block text-left font-medium mb-1">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="text" name="phone" placeholder="Enter phone number" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label className="block text-left font-medium mb-1">
                            <span className="label-text">Tutor ID</span>
                        </label>
                        <input name="tutorId" type="text" defaultValue={tutor?._id} className="input input-bordered w-full" readOnly />
                    </div>

                    <div>
                        <label className="block text-left font-medium mb-1">
                            <span className="label-text">Tutor Name</span>
                        </label>
                        <input name="tutorName" type="text" defaultValue={tutor?.tutorName} className="input input-bordered w-full" readOnly />
                    </div>

                    <div>
                        <label className="block text-left font-medium mb-1">
                            <span className="label-text">Book Status</span>
                        </label>
                        <input
                            name="bookStatus"
                            type="text"
                            className="input input-bordered w-full"
                            defaultValue={tutor.totalSlot > 0 ? "Booking available" : "No available slots left"}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button type="submit" className="btn bg-[#EC6530] text-white">
                            Confirm Booking
                        </button>
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookModal;