"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="relative"
            style={{ backgroundColor: "#FFE3E3" }} >
            <div className="h-2 w-full" style={{
                background: "linear-gradient(to right, #8FDDDF, #FFAE6E, #EC6530)" }} />

            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid md:grid-cols-4 gap-10">

                    <div>
                        <h2 className="text-3xl font-bold mb-4" style={{ color: "#EC6530" }}> MediQueue </h2>

                        <p className="text-gray-700">
                            Connecting learners with expert tutors through a modern, accessible, and personalized learning experience. </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4" style={{ color: "#EC6530"}}> Tutor Services Links </h3>

                        <ul className="space-y-2">
                            <li>
                                <Link href="/tutors" className="hover:text-[#EC6530] transition"> Find Tutors</Link>
                            </li>

                            <li>
                                <Link href="/add-tutor" className="hover:text-[#EC6530] transition" > Become a Tutor </Link>
                            </li>

                            <li>
                                <Link href="/my-bookings" className="hover:text-[#EC6530] transition" >
                                    Learning Sessions
                                </Link>
                            </li>

                            <li>
                                <Link href="/" className="hover:text-[#EC6530] transition-colors" >
                                    Study Resources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4" style={{ color: "#EC6530" }} >
                            Contact Us
                        </h3>

                        <div className="space-y-2 text-gray-700">
                            <p>Location: Dhaka, Bangladesh</p>
                            <p>Email: support@mediqueue.com</p>
                            <p>Phone No: +880 1234-567890</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4" style={{ color: "#EC6530" }} >
                            Follow Us
                        </h3>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center duration-300 hover:scale-110 bg-[#FFAE6E]"><FaFacebookF size={18} className="text-white" /></div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center duration-300 hover:scale-110 bg-[#FFAE6E]"><FaInstagram size={18} className="text-white" /></div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center duration-300 hover:scale-110 bg-[#FFAE6E]"><FaLinkedinIn size={18} className="text-white" /></div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center duration-300 hover:scale-110 bg-[#FFAE6E]"><FaX size={18} className="text-white" /></div>
                        </div>

                        <p className="mt-4 text-gray-700">
                            Join our learning community and stay updated.
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t py-4 text-center"
                style={{
                    borderColor: "#FFAE6E",
                    backgroundColor: "#ffdcc0"
                }} >
                <p className="font-medium text-[#04a2a8]"> © {new Date().getFullYear()} MediQueue. All rights reserved. </p>
            </div>
        </footer>
    );
};

export default Footer;