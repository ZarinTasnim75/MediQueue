import Image from 'next/image';
import React from 'react';
import BookSection from '@/components/BookSection';
import { headers, cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const TutorDetailsPage = async ({ params }) => {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(`/login?redirect=/tutors/${id}`);
    }
    const user = session.user;
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get('auth_token')?.value;

    if (!jwtToken) {
        const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                sessionToken: session.session.token
            }),
        });

        if (tokenResponse.ok) {
            const data = await tokenResponse.json();
            const newToken = data.token;

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
                headers: {
                    'Authorization': `Bearer ${newToken}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            });

            if (!res.ok) {
                console.error("Fetch failed:", res.status);
                return [];
            }
            const tutor = await res.json();
            return <TutorDisplay tutor={tutor} user={user} />;
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (res.status === 401) {
        redirect('/login');
    }

    if (!res.ok) {
        console.error("Fetch failed:", res.status);
        return [];
    }
    const tutor = await res.json();

    return <TutorDisplay tutor={tutor} user={user} />;
};


function TutorDisplay({ tutor, user }) {
    const today = new Date();
    const sessionDate = new Date(tutor.sessionDate);
    const noSlot = tutor.totalSlot <= 0;
    const bookingNotStarted = today < sessionDate;

    return (
        <div>

            <div className="min-h-screen bg-gradient-to-b from-[#8FDDDF]/20 to-[#FFE3E3]/30 py-10 px-4">
                <div className="max-w-4xl mx-auto">

                    <div className="card bg-white shadow-2xl border border-[#8FDDDF]">

                        <div className="card-body">

                            <div className="flex flex-col items-center">

                                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#EC6530]">
                                    <Image src={tutor.photo || "/placeholder-avatar.png"} alt={tutor.tutorName || "Tutor"} fill className="object-cover" />
                                </div>

                                <h1 className="text-4xl font-bold mt-5 text-[#EC6530]">  {tutor.tutorName} </h1>

                                <div className="flex gap-3 mt-3 flex-wrap justify-center">
                                    <div className="badge bg-[#8FDDDF] text-black border-none"> {tutor.subject} </div>

                                    <div className="badge bg-[#FFE3E3] text-black border-none">  {tutor.teachingMode} </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h3 className="font-bold">Hourly Fee</h3>
                                    <p>${tutor.hourlyFee}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h3 className="font-bold">Location</h3>
                                    <p>{tutor.location}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h3 className="font-bold">Available Days</h3>
                                    <p>{tutor.availableDays}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h3 className="font-bold">Available Time</h3>
                                    <p>{tutor.availableTime}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h3 className="font-bold">Total Slots</h3>
                                    <p>{tutor.totalSlot}</p>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h3 className="font-bold">Session Date</h3>
                                    <p>{tutor.sessionDate}</p>
                                </div>

                            </div>

                            <div className="mt-8">

                                <h2 className="text-2xl font-bold mb-3 text-[#EC6530]"> Experience </h2>

                                <p className="bg-base-200 p-5 rounded-xl"> {tutor.experience} </p>

                            </div>

                            {tutor.description && (
                                <div className="mt-6">
                                    <h2 className="text-2xl font-bold mb-3 text-[#EC6530]">
                                        Additional Information
                                    </h2>

                                    <p className="bg-base-200 p-5 rounded-xl">
                                        {tutor.description}
                                    </p>
                                </div>
                            )}

                            <div className="mt-8">

                                {noSlot && (
                                    <div className="alert alert-error">
                                        <span>
                                            This session is fully booked. You can't join at the moment.
                                        </span>
                                    </div>
                                )}

                                {!noSlot && bookingNotStarted && (
                                    <div className="alert alert-warning">
                                        <span>
                                            Booking is not available yet for this tutor.
                                        </span>
                                    </div>
                                )}

                                {!noSlot && !bookingNotStarted && (
                                    <div className="flex justify-center">
                                        <BookSection tutor={tutor} user={user} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TutorDetailsPage;