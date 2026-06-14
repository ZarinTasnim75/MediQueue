"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import DeleteTutor from "@/components/DeleteTutor";
import UpdateTutor from "@/components/UpdateTutor";

const MyTutorsPage = () => {
    const [tutors, setTutors] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const fetchTutors = async () => {
            if (!session?.user?.email) return;

            setLoading(true);

            const res = await fetch( `http://localhost:5000/my-tutors?email=${session.user.email}` );

            const data = await res.json();
            setTutors(data);
            setLoading(false);
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
                                        <UpdateTutor  tutor={tutor} onUpdate={() => setRefreshKey((prev) => prev + 1) } />
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