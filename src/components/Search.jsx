"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = ({ initialSearch }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(initialSearch || "");

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (searchTerm.trim() === "") {
            router.push('/tutors');
        } else {
            router.push(`/tutors?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tutors by name..." className="input input-bordered input-sm w-full pl-9 pr-3 text-sm bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600" />
                </div>
                <button type="submit" className="btn bg-[#EC6530] text-white border-none">
                    Search
                </button>
                {searchTerm && (
                    <button type="button" onClick={() => {  setSearchTerm(""); router.push('/tutors'); }} className="btn btn-ghost" >
                        Clear
                    </button>
                )}
            </form>
        </div>
    );
};

export default Search;