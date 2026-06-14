"use client"

import { useState, useEffect } from "react";
import BookButton from "./BookButton";
import BookModal from "./BookModal";
import { authClient } from "@/lib/auth-client";

const BookSection = ({ tutor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: session } = await authClient.getSession();
            setUser(session?.user ?? null);
        };
        fetchUser();
    }, []);

    return (
        <>
            <BookButton onOpen={() => setIsOpen(true)} />
            <BookModal tutor={tutor}  user={user}  isOpen={isOpen}  onClose={() => setIsOpen(false)} />
        </>
    );
};

export default BookSection;