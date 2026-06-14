import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#8FDDDF]/30 to-[#FFE3E3]/40 text-center px-6">

            <h1 className="text-7xl font-bold text-[#EC6530]">404</h1>

            <h2 className="text-2xl font-semibold mt-4 text-gray-700">
                Page Not Found
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
                The page you are looking for doesn’t exist or has been moved.
            </p>

            <Link href="/">
                <button className="mt-6 btn bg-[#EC6530] text-white border-none">
                    Go Home
                </button>
            </Link>

        </div>
    );
};

export default NotFound;