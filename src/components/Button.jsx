"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from 'react';

const Button = ({ tutorId }) => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleClick = () => {
        if (!session?.user) {
            router.push(`/login?redirect=/tutors/${tutorId}`);
            return;
        }

        router.push(`/tutors/${tutorId}`);
    };

    return (
        <button onClick={handleClick} className="btn mt-5 bg-[#EC6530] hover:bg-[#d85724] border-none text-white rounded-sm hover:scale-105 px-8" >
            Book Session
        </button>
    );
};

export default Button;