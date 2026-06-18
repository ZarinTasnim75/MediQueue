"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getAuthToken } from "@/lib/jwt-utils";

const UpdateTutor = ({ tutor, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = getAuthToken();
        
        if (!token) {
            toast.error("Please login again to update tutor");
            setLoading(false);
            return;
        }

        const form = e.target;

        const updatedTutor = {
            tutorName: form.tutorName.value,
            photo: form.photo.value,
            subject: form.subject.value,
            teachingMode: form.teachingMode.value,
            hourlyFee: form.hourlyFee.value,
            location: form.location.value,
            availableDays: form.availableDays.value,
            availableTime: form.availableTime.value,
            totalSlot: Number(form.totalSlot.value),
            sessionDate: form.sessionDate.value,
            experience: form.experience.value,
            description: form.description.value,
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${tutor._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedTutor),
                }
            );

            if (res.ok) {
                toast.success("Tutor updated successfully");
                setOpen(false);

                if (onUpdate) {
                    onUpdate();
                }
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.message || "Update failed");
            }
        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="btn bg-[#EC6530] text-white border-none btn-sm">Update</button>

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-3xl font-bold text-center text-[#EC6530] mb-6">Update Tutor</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <label className="font-semibold">Tutor Name</label>
                            <input name="tutorName" defaultValue={tutor.tutorName} className="input input-bordered w-full" />

                            <label className="font-semibold">Photo URL</label>
                            <input name="photo" defaultValue={tutor.photo} className="input input-bordered w-full" />

                            <label className="font-semibold">Subject</label>
                            <input name="subject" defaultValue={tutor.subject} className="input input-bordered w-full" />

                            <label className="font-semibold">Teaching Mode</label>
                            <input name="teachingMode" defaultValue={tutor.teachingMode} className="input input-bordered w-full" />

                            <label className="font-semibold">Hourly Fee</label>
                            <input name="hourlyFee" defaultValue={tutor.hourlyFee} className="input input-bordered w-full" />

                            <label className="font-semibold">Location</label>
                            <input name="location" defaultValue={tutor.location} className="input input-bordered w-full" />

                            <label className="font-semibold">Available Days</label>
                            <input name="availableDays" defaultValue={tutor.availableDays} className="input input-bordered w-full" />

                            <label className="font-semibold">Available Time</label>
                            <input name="availableTime" defaultValue={tutor.availableTime} className="input input-bordered w-full" />

                            <label className="font-semibold">Total Slots</label>
                            <input name="totalSlot" defaultValue={tutor.totalSlot} className="input input-bordered w-full" />

                            <label className="font-semibold">Session Date</label>
                            <input type="date" name="sessionDate" defaultValue={tutor.sessionDate} className="input input-bordered w-full" />

                            <label className="font-semibold">Experience</label>
                            <textarea name="experience" defaultValue={tutor.experience} className="textarea textarea-bordered w-full"></textarea>

                            <label className="font-semibold">Description</label>
                            <textarea name="description" defaultValue={tutor.description} className="textarea textarea-bordered w-full"></textarea>

                            <div className="flex justify-end gap-3 pt-4">

                                <button type="button" onClick={() => setOpen(false)} className="btn bg-[#FFE3E3] text-black border-none">Cancel</button>

                                <button type="submit" className="btn bg-[#EC6530] text-white border-none">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateTutor;