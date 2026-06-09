"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {

    const user = {
        name: "Zarin",
        url: "https://i.pravatar.cc/150?img=5",
    };

    const navLinks = (
        <>
            <li className="text-black hover:bg-[#EC6530] hover:text-white rounded"><Link href="/">Home</Link></li>
            <li className="text-black hover:bg-[#EC6530] hover:text-white rounded"><Link href="/tutors">Tutors</Link></li>

            {user && (
                <>
                    <li className="text-black hover:bg-[#EC6530] hover:text-white rounded"><Link href="/add-tutor">Add Tutor</Link></li>
                    <li className="text-black hover:bg-[#EC6530] hover:text-white rounded"><Link href="/my-tutors">My Tutors</Link></li>
                    <li className="text-black hover:bg-[#EC6530] hover:text-white rounded"><Link href="/my-booked-sessions">My Booked Sessions</Link></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4" style={{ backgroundColor: "#FFE3E3" }}>

            <div className="navbar-start">
                <div className="dropdown"><button className="btn btn-ghost lg:hidden"> <FaBars size={18} /> </button>

                    <ul className="menu dropdown-content mt-3 z-50 bg-red-100 border border-red-900 rounded-box w-50">
                        {navLinks}
                    </ul>
                </div>

                <Link href="/" className="btn btn-ghost text-xl font-bold text-primary" style={{ color: "#EC6530" }}>MediQueue</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>

            <div className="navbar-end gap-2">
                {!user ? (
                    <>
                        <Link href="/login" className="btn" style={{
                            backgroundColor: "#FFAE6E",
                            border: "none",
                            color: "black",
                        }} >Login</Link>
                        <Link href="/register" className="btn" style={{
                            backgroundColor: "#EC6530",
                            border: "none",
                            color: "white",
                        }} >Register</Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" style={{ backgroundColor: "#FFAE6E" }}>
                            <div className="w-10 rounded-full">
                                <Image src={user?.url || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="Profile" width={40} height={40} />
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box border border-red-900 z-50 mt-3 w-52 p-2" style={{ backgroundColor: "#FFE3E3" }}>
                            <li><span className="font-semibold">Hello! {user.name}</span></li>
                            <li><Link href="/profile">Profile</Link></li>
                            <li><button>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;