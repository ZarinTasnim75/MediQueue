"use client"
import Link from 'next/link';
import React from 'react';

const error = ( { reset } ) => {
    return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#8FDDDF]/30 to-[#FFE3E3]/40 text-center px-6">

            <h2 className="text-xl font-semibold mt-3 text-gray-700">
                Something went wrong
            </h2>
            <div className="flex gap-3 mt-6">
                <button onClick={() => reset()} className="btn bg-[#EC6530] text-white border-none" > Try Again </button>
                <Link href="/">
                    <button className="btn bg-[#FFE3E3] text-black border-none"> Go Home </button>
                </Link>
            </div>

        </div>
    );
};

export default error;