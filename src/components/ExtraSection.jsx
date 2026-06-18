import React from 'react';
import Chart from '@/components/Chart';

const ExtraSection = () => {
    return (
        <div>
            <div className="py-16 bg-[#FFE3E3]/40">
                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center text-[#EC6530] mb-10"> Why Choose Our Tutors? </h2>

                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        <div className="grid gap-6">

                            <div className="bg-white p-6 rounded-2xl shadow border-l-8 border-[#8FDDDF]">
                                <h3 className="text-2xl font-bold text-[#EC6530]">10,000+</h3>
                                <p className="text-gray-600">Students Served</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow border-l-8 border-[#FFAE6E]">
                                <h3 className="text-2xl font-bold text-[#EC6530]">50,000+</h3>
                                <p className="text-gray-600">Learning Hours Delivered</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow border-l-8 border-[#EC6530]">
                                <h3 className="text-2xl font-bold text-[#EC6530]">95%</h3>
                                <p className="text-gray-600">Student Satisfaction Rate</p>
                            </div>

                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow w-full min-w-0">
                            <h3 className="text-xl font-bold text-center text-[#EC6530] mb-4"> Student Result Improvement </h3>
                            <Chart />
                        </div>

                    </div>
                </div>
            </div>

            <div className="py-16 bg-[#8FDDDF]/15">
                <div className="max-w-6xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center text-[#EC6530] mb-12">
                        Start Learning in 3 Easy Steps
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 text-center">

                        <div className="bg-white p-8 rounded-2xl shadow">
                            <div className="w-14 h-14 rounded-full bg-[#8FDDDF] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="font-bold text-xl mb-2">Find a Tutor</h3>
                            <p>Browse tutors by subject, availability, and teaching mode.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow">
                            <div className="w-14 h-14 rounded-full bg-[#FFAE6E] flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="font-bold text-xl mb-2">Book a Session</h3>
                            <p>Choose a suitable tutor and reserve an available slot.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow">
                            <div className="w-14 h-14 rounded-full bg-[#EC6530] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="font-bold text-xl mb-2">Start Learning</h3>
                            <p>Attend your session and achieve your learning goals.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;