"use client"

import React from "react";
import { useRouter } from "next/navigation";

const BookModal = ({ tutor, user }) => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const bookingData = Object.fromEntries(formData.entries());
        bookingData.bookStatus = tutor.totalSlot > 0 ? "Booked" : "No available slots left";

        try {
            const res = await fetch("http://localhost:5000/book-session",
                {
                    method: "POST",
                    headers: {
                        "content-type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        bookingData
                    ),
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert("Booking Successful");
                document.getElementById("book_modal").close();
                router.refresh();
            }
            else {
                alert(data.message);
            }
        }
        catch (error) {
            console.error(error);
            alert("Booking Failed");
        }

    };

    return (
        <>
            <button className="btn bg-[#EC6530] text-white" onClick={() => document.getElementById("book_modal").showModal()} > Ready to Book </button>

            <dialog id="book_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-2xl mb-6 text-center"> Book Session </h3>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="block text-left font-medium mb-1"> <span className="label-text">Student Name</span> </label>
                            <input type="text" name="studentName" defaultValue={user?.displayName} className="input input-bordered w-full" readOnly />
                        </div>

                        <div>
                            <label className="block text-left font-medium mb-1"> <span className="label-text">Student Email</span>  </label>
                            <input type="email" name="studentEmail" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                        </div>

                        <div>
                            <label className="block text-left font-medium mb-1">  <span className="label-text">Phone Number</span></label>
                            <input type="text" name="phone" placeholder="Enter phone number" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="block text-left font-medium mb-1"> <span className="label-text">Tutor ID</span> </label>
                            <input name="tutorId" type="text" defaultValue={tutor?._id} className="input input-bordered w-full" readOnly />
                        </div>

                        <div>
                            <label className="block text-left font-medium mb-1"> <span className="label-text">Tutor Name</span> </label>
                            <input name="tutorName" type="text" defaultValue={tutor?.tutorName} className="input input-bordered w-full" readOnly />
                        </div>

                        <div>
                            <label className="block text-left font-medium mb-1"> <span className="label-text">Book Status</span> </label>
                            <input
                                name="bookStatus"
                                type="text" className="input input-bordered w-full"
                                defaultValue={tutor.totalSlot > 0 ? "Booking available" : "No available slots left"}
                                readOnly
                            />
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn bg-[#EC6530] text-white" > Confirm Booking </button>
                            <button type="button" className="btn" onClick={() => document.getElementById("book_modal").close()}> Cancel </button>
                        </div>
                    </form>

                </div>
            </dialog>
        </>
    );
};

export default BookModal;