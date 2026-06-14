"use client";

import { useEffect, useState } from "react";
import CancelButton from "@/components/CancelButton";
import { authClient } from "@/lib/auth-client";

export default function MyBooking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const { data: session } = authClient.useSession();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!session?.user?.email) return;

            setLoading(true);

            const res = await fetch(
                `http://localhost:5000/bookings?email=${session.user.email}`,
                { cache: "no-store" }
            );

            const data = await res.json();

            setBookings(data);
            setLoading(false);
        };

        fetchBookings();
    }, [session, refreshKey]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#8FDDDF]/20 to-[#FFE3E3]/30">
                <span className="loading loading-spinner loading-lg text-[#EC6530]"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-[#8FDDDF]/20 to-[#FFE3E3]/30">

            <h1 className="text-3xl font-bold text-center mb-8 text-[#EC6530]">
                My Booked Sessions
            </h1>

            {bookings.length === 0 ? (
                <div className="text-center text-gray-500 bg-white p-6 rounded-xl shadow border border-[#8FDDDF]">
                    No bookings found
                </div>
            ) : (
                <div className="overflow-x-auto">

                    <table className="table w-full bg-white shadow-xl rounded-xl border border-[#8FDDDF]">

                        <thead className="bg-[#8FDDDF] text-black">
                            <tr>
                                <th>Tutor Name</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {bookings.map((b) => (
                                <tr key={b._id} className="hover:bg-[#FFE3E3]/40">

                                    <td className="font-semibold text-[#EC6530]">
                                        {b.tutorName}
                                    </td>

                                    <td>{b.studentName}</td>
                                    <td>{b.studentEmail}</td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            b.bookStatus === "cancelled"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-[#8FDDDF] text-black"
                                        }`}>
                                            {b.bookStatus}
                                        </span>
                                    </td>

                                    <td>
                                        {b.bookStatus !== "cancelled" ? (
                                            <CancelButton
                                                id={b._id}
                                                onCancel={() =>
                                                    setRefreshKey(prev => prev + 1)
                                                }
                                            />
                                        ) : (
                                            <span className="text-red-500 font-semibold">
                                                Cancelled
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}