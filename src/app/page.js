import Banner from "@/components/Banner";
import ExtraSection from "@/components/ExtraSection";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getTutors() {
  const res = await fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor?limit=6`,
  {
    cache: "no-store",
  }
);
if (!res.ok) {
    console.error("Fetch failed:", res.status);
    return []; 
}
  const data = await res.json();
  return data;
}

const HomePage = async () => {
  const tutors = await getTutors();
  return (
    <div>
      <Banner></Banner>
      <div className="p-10 bg-gradient-to-b from-[#8FDDDF]/20 to-[#FFE3E3]/30">
        <h2 className="text-4xl font-bold text-center text-[#EC6530] mb-8"> {" "} OUR TUTORS {" "} </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="relative bg-white rounded-2xl border-4 border-[#EC6530] overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1" >
              <div className="h-12" style={{
                  background: "repeating-linear-gradient( 45deg, #EAF9FA, #EAF9FA 20px, #FFF1F1 20px, #FFF1F1 40px, #FFE6CC 40px, #FFE6CC 60px )" }}  ></div>

              <div className="px-6 pb-6 -mt-8 flex flex-col items-center">
                <Image src={tutor.photo} alt={tutor.tutorName} width={110} height={110} className="rounded-full border-4 border-white object-cover shadow-md w-[110px] h-[110px]"  />

                <h2 className="text-xl font-bold text-[#EC6530] mt-4 text-center">
                  {tutor.tutorName}
                </h2>

                <span className="mt-2 px-4 py-1 rounded-full bg-[#FFE3E3] text-[#EC6530] font-medium">
                  {tutor.subject}
                </span>

                <div className="w-full mt-4 space-y-2 text-center">
                  <p>
                    <span className="font-semibold">Mode:</span>{" "}
                    {tutor.teachingMode}
                  </p>

                  <p>
                    <span className="font-semibold">Fee:</span> $
                    {tutor.hourlyFee}/hr
                  </p>

                  <p>
                    <span className="font-semibold">Slots:</span>{" "}
                    {tutor.totalSlot}
                  </p>
                </div>

                <Link href={`/tutors/${tutor._id}`} className="btn mt-5 bg-[#EC6530] text-white border-none hover:bg-[#d85724]" > Book Session </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default HomePage;