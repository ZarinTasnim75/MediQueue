import Image from 'next/image';
import React from 'react';
import Button from '../../../components/Button';
import Search from '@/components/Search';
import Link from 'next/link';

const TutorPage = async (props) => {
    const searchParams = await props.searchParams;
    const search = searchParams?.search || "";
    const startDate = searchParams?.startDate || "";
    const endDate = searchParams?.endDate || "";

    let tutors = [];
    
    try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        let url;
        if (search && search.trim() !== "") {
            url = `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor?search=${encodeURIComponent(search.trim())}`;
        } else {
            url = `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`;
        }
        
        const res = await fetch(url, { cache: 'no-store' });
        
        if (res.ok) {
            const data = await res.json();
            tutors = Array.isArray(data) ? data : [];
        }
    } catch (error) {
        tutors = [];
    }

    if (tutors.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#8FDDDF]/20 via-white to-[#FFE3E3]/40 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-500">No tutors available</h1>
                    <p className="text-gray-400 mt-2">Check back later for new tutors</p>
                </div>
            </div>
        );
    }

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

            <Search initialSearch={search} initialStartDate={startDate} initialEndDate={endDate}/>

            <div className="text-center mb-6">
                <p className="text-gray-600">
                    {tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found
                    {search && ` for "${search}"`}
                </p>
            </div>

            {tutors.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-500">No tutors available</h2>
                    <p className="text-gray-400 mt-2">
                        {search 
                            ? `No tutors matching "${search}"`
                            : "Check back later for new tutors"}
                    </p>
                    {(search || startDate || endDate) && (
                        <Link   href="/tutors"  className="btn bg-[#EC6530] text-white mt-4 inline-block" >
                            Clear Filters
                        </Link>
                    )}
                </div>
            ) : (

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
                                            <span> {tutor.location}  </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-600">  Available </span>
                                            <span>  {tutor.availableDays} </span>
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
                        <Button tutorId={tutor._id} />
                    </div>
                ))}
            </div>
               )}
        </div>
    );
};

export default TutorPage;