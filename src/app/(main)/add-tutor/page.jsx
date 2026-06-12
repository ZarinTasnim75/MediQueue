"use client"

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

const AddTutorPage = () => {

    const onSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData(e.currentTarget);

        const tutor = Object.fromEntries(formData.entries());

        tutor.hourlyFee = Number(tutor.hourlyFee);
        tutor.totalSlot = Number(tutor.totalSlot);
        tutor.sessionDate = selectedDate.toISOString().split("T")[0];

        const res = await fetch("http://localhost:5000/tutor", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(tutor),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Tutor added successfully!");

            e.target.reset();
            setSelectedDate(new Date());
        } else {
            toast.error(data.message || "Failed to add tutor");
        }
    } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
    }
};

    const [selectedDate, setSelectedDate] = useState(new Date());
    return (

        <div className="min-h-screen bg-[#FFAE6E] flex items-center justify-center px-6 py-10">
            <div className="relative w-full max-w-5xl rounded-sm overflow-hidden shadow-xl">
                <Image src="/assets/bg-form.jpg" alt="Tutor form" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 p-8 text-white">

                    <h1 className="text-5xl font-bold text-center text-[#EC6530] mb-2"> Create a Tutor  </h1>

                    <p className="text-center text-gray-100 mb-8"> Let others find you as a tutor  </p>

                    <form onSubmit={onSubmit}
                        className="space-y-6 ">
                        <div className="grid md:grid-cols-2 gap-6">
                            <fieldset className="fieldset">
                                <label className="label text-white text-xl">Tutor Name</label>
                                <input type="text" name="tutorName" placeholder="Enter tutor name" className="input input-bordered text-black" required />  </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-white text-xl">Tutor Photo URL</label>
                                <input type="url" name="photo" placeholder="Paste image link" className="input input-bordered  text-black" required />  </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-white text-xl">Subject</label>
                                <select name="subject" className="select select-bordered  text-black " required>
                                    <option value="">Select Subject</option>
                                    <option>Mathematics</option>
                                    <option>Physics</option>
                                    <option>Chemistry</option>
                                    <option>Biology</option>
                                    <option>English</option>
                                    <option>ICT</option>
                                    <option>Economics</option>
                                    <option>Accounting</option> </select> </fieldset>

                            <fieldset className="fieldset">
                                <label className="label  text-white text-xl">Teaching Mode</label>
                                <select name="teachingMode" className="select select-bordered  text-black" required>
                                    <option value="">Select Mode</option>
                                    <option>Online</option>
                                    <option>Offline</option>
                                    <option>Both</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label  text-white font-semibold text-xl">Available Days</label>
                                <input type="text" name="availableDays" placeholder="Sun - Thu" className="input input-bordered  text-black" required />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label  text-white font-semibold text-xl">Available Time Slot</label>
                                <input type="text" name="availableTime" placeholder="5:00 PM - 8:00 PM" className="input input-bordered text-black" required />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-white font-bold text-xl">Hourly Fee</label>
                                <input type="number" name="hourlyFee" placeholder="Enter fee" className="input input-bordered text-black" required />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-white font-bold text-xl">Total Slots</label>
                                <input type="number" name="totalSlot" placeholder="Available slots" className="input input-bordered text-black" required />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-white font-bold text-xl">Session Start Date</label>
                                <div className="relative text-black">
                                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#EC6530] z-10" />
                                    <DatePicker selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy"
                                        className="input input-bordered pl-10" />

                                    <input type="hidden" name="sessionDate" value={selectedDate.toISOString()} />
                                </div>
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-white font-bold text-xl">Location</label>
                                <input type="text" name="location" placeholder="Area / City" className="input input-bordered text-black" required />
                            </fieldset>

                        </div>

                        <fieldset className="fieldset">
                            <label className="label text-white font-bold text-xl"> Experience</label>
                            <textarea name="experience" rows="5" className="textarea textarea-bordered text-black"
                                placeholder="Example: Your education and experience" required ></textarea>
                        </fieldset>

                        <fieldset className="fieldset">
                            <label className="label text-white font-bold text-xl">Additional Information (Optional)</label>
                            <textarea name="description" rows="4" className="textarea textarea-bordered text-black"
                                placeholder="Share anything students should know about you..." ></textarea>
                        </fieldset>

                        <div className="text-center pt-4">
                            <button type="submit" className="btn bg-[#EC6530] hover:bg-[#d85724] border-none text-white px-10 shadow-none hover:scale-105" > Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTutorPage;