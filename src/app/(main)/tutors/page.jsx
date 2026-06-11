import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TutorPage = async () => {
    const res = await fetch('http://localhost:5000/tutor')
    const tutors = await res.json()

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#8FDDDF]/20 via-white to-[#FFE3E3]/40">

            <figure className="diff center w-full h-15  mx-auto mb-15" tabIndex={0}>
                <div className="diff-item-1" role="img" tabIndex={0}>
                    <div className="bg-[#7bd3d8fb] text-primary-content grid place-content-center text-2xl font-black tracking-widest text-white">
                        ALL TUTORS
                    </div>
                </div>
                <div className="diff-item-2" role="img">
                    <div className="bg-[#FFE3E3] grid place-content-center text-2xl font-black">Choose your favourite teacher</div>
                </div>
                <div className="diff-resizer w-30"></div>
            </figure>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center py-12">
                {tutors.map((tutor) => (
                    <div key={tutor._id} className="flex flex-col items-center">

                        <div className="hover-3d">
                            <div className="card w-70 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#EC6530]">
                                <div className="flex justify-center pt-6">
                                    <div className="relative w-27 h-27 rounded-full overflow-hidden border-2 border-[#91999ba1] shadow-md">
                                        <Image src={tutor.photo} alt={tutor.tutorName} fill className="object-cover" />
                                    </div>
                                </div>

                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-2xl text-[#EC6530] font-bold justify-center">{tutor.tutorName}  </h2>

                                    <div className="flex gap-2 justify-center flex-wrap">
                                        <span className="badge bg-[#8FDDDF] border-none text-black"> {tutor.subject} </span>

                                        <span className="badge bg-[#FFE3E3] border-none text-black"> {tutor.teachingMode} </span>
                                    </div>

                                    <div className="divider my-1"></div>

                                    <div className="bg-[#F8FAFC] rounded-xl p-4 w-full space-y-3">

                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600"> Hourly Fee  </span>

                                            <span className="font-bold text-[#EC6530]">  ${tutor.hourlyFee} </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600"> Location </span>

                                            <span>
                                                {tutor.location}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600">
                                                Available
                                            </span>

                                            <span>
                                                {tutor.availableDays}
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Required for hover-3d */}
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <Link href={`/tutors/${tutor._id}`}>
                            <button className="btn mt-5 bg-[#EC6530] hover:bg-[#d85724] border-none text-white rounded-sm hover:scale-105 px-8 ">
                                Book Session 
                            </button>
                        </Link>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default TutorPage;