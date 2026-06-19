"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import DeleteTutor from "@/components/DeleteTutor";
import UpdateTutor from "@/components/UpdateTutor";
import { getAuthToken } from "@/lib/jwt-utils";

const MyTutorsPage = () => {
    const [tutors, setTutors] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const fetchTutors = async () => {
            if (!session?.user?.email) {
                setLoading(false);
                return;
            }
            setLoading(true);

            try {
                const token = getAuthToken();
                if (!token) {
                    setTutors([]);
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors?email=${session.user.email}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    console.error("Fetch failed:", res.status);
                    return [];
                }

                if (res.status === 401) {
                    window.location.href = '/login';
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setTutors(Array.isArray(data) ? data : []);
                } else {
                    setTutors([]);
                }
            } catch (error) {
                setTutors([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, [session, refreshKey]);

    return (
        <div className="p-8 min-h-screen bg-gradient-to-b from-[#8FDDDF]/30 to-[#FFE3E3]/70">

            <h1 className="text-3xl font-bold text-center mb-8 text-[#EC6530]">  My Tutors </h1>

            {loading ? (
                <div className="flex justify-center mt-20">
                    <span className="loading loading-spinner loading-lg text-[#EC6530]"></span>
                </div>

            ) : tutors.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow text-center"> No tutors added yet </div>

            ) : (
                <div className="overflow-x-auto">
                    <table className="table bg-white rounded-xl shadow w-full">

                        <thead className="bg-[#8FDDDF] text-black">
                            <tr>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Fee</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tutors.map((tutor) => (
                                <tr key={tutor._id}>
                                    <td>{tutor.tutorName}</td>
                                    <td>{tutor.subject}</td>
                                    <td>${tutor.hourlyFee}</td>

                                    <td className="space-x-2">
                                        <UpdateTutor tutor={tutor} onUpdate={() => setRefreshKey((prev) => prev + 1)} />
                                        <DeleteTutor id={tutor._id} onDelete={() => setRefreshKey((prev) => prev + 1)} />
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
export default MyTutorsPage;