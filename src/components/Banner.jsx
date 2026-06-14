"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>

            <div className="relative w-full h-[500px] overflow-hidden">

                <div className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <Image src="https://images.openai.com/static-rsc-4/ko4ZJeVY7SY3im0o-Fe7wXYo4ttW9p43HRfI8RaUhOAf1wyCbdWKITI91mKNnDIenN_YE1PAQn-CvOMY5zGnQHmEezjUm96cKcYldTFuxOM7aUAbGLQPK654KqnZ6MYoUzgUw8a3MkHzUIaHiKNcciyCJd8H9EwdP6QP5RPTxTUZHMEQwUfATSNr5bWMRoqE?purpose=fullsize" alt="Learning" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-center text-white">
                        <div>
                            <h1 className="text-5xl font-bold text-[#dc50e6] [text-shadow:4px_4px_2_#9a21a3] tracking-widest">
                                Find the Perfect Tutor 
                            </h1>
                            <p className="mt-4 text-2xl font-semibold">Connect with experienced tutors easily</p>
                            <Link href="/tutors">
                                <button className="btn mt-6 bg-[#e66450] border-none shadow-none hover:scale-110">Explore Tutors</button>
                            </Link>
                        </div>

                        <button
                            className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 text-white border-none shadow-lg hover:bg-black/70"
                            onClick={() => setCurrentSlide((currentSlide + 2) % 3)}  >
                            ❮
                        </button>

                        <button
                            className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 text-white border-none shadow-lg hover:bg-black/70"
                            onClick={() => setCurrentSlide((currentSlide + 1) % 3)} >
                            ❯
                        </button>
                    </div>
                </div>

                <div className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3" alt="Learning" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white">
                        <div>
                            <h1 className="text-5xl font-bold text-[#5698fa] [text-shadow:3.5px_3.5px_2_#000cf7b7] tracking-widest">Learn Anytime</h1>
                            <p className="mt-4 font-semibold text-2xl">Flexible learning with experts </p>
                            <Link href="/tutors">
                                <button className="btn mt-6 bg-[#FFAE6E] text-black border-none shadow-none hover:scale-110">Browse Tutors</button>
                            </Link>
                        </div>

                        <button
                            className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 text-white border-none shadow-lg hover:bg-black/70"
                            onClick={() => setCurrentSlide((currentSlide + 2) % 3)} >
                            ❮ </button>

                        <button
                            className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 text-white border-none shadow-lg hover:bg-black/70"
                            onClick={() => setCurrentSlide((currentSlide + 1) % 3)} >
                             ❯ </button>
                    </div>
                </div>

                <div className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === 2 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <Image src="https://images.openai.com/static-rsc-4/hXD6X1djNn8eaAXMWFA6nlIPQhAmG8nQAT7aEVvbcgg9a0YzN6O40LJ1YdFw-hoKqrEjHryRchKerMKYe1grS-54GHt7VbLeu4vzlyRJ68HQCSeI6hVxF33pW72tutNzkA1LZG4DuNBFlZyrf3sk3RqnqLlxZImDoy-A9yM8Xs6ezercB0Ay74t-y2snCzf0?purpose=fullsize" alt="Learning" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center text-white">
                        <div>
                            <h1 className="text-5xl font-bold  text-[#2bdca4e7] [text-shadow:4px_4px_2_#0f6046] tracking-widest">Unlock Your Potential</h1>
                            <p className="mt-4 text-2xl">Achieve academic success</p>
                            <Link href="/tutors">
                                <button className="btn mt-6 bg-[#8FDDDF] text-black border-none shadow-none hover:scale-110">Find Tutor</button>
                            </Link>
                        </div>

                        <button
                            className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 text-white border-none shadow-lg hover:bg-black/70"
                            onClick={() => setCurrentSlide((currentSlide + 2) % 3)}> ❮ </button>

                        <button
                            className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-black/50 text-white border-none shadow-lg hover:bg-black/70"
                            onClick={() => setCurrentSlide((currentSlide + 1) % 3)} >  ❯ </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;