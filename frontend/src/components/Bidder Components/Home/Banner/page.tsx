// 'use client';

// import Image from 'next/image';

// export const Banner = () => {
//     return (
//         <div className="relative w-full h-[620px] bg-[#3C3633]/50">
//             <Image
//                 src="/empty-auditorium-awaiting-big-performance-ahead-generated-by-ai.jpg"
//                 alt="Home Banner"
//                 fill
//                 style={{ objectFit: 'cover', opacity: 0.5 }}
//                 priority
//             />
//             <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6 text-center">
//                 <div>
//                     <h1
//                         className="text-[#DCD7C9] font-thin tracking-tight text-7xl"
//                     >
//                         Auctregal
//                     </h1>

//                     <p className="text-white font-thin bg-[#3C3633]/70 pl-5 pr-5">
//                         Browse unique items, place bids, and acquire treasures on Auctregal
//                     </p>
//                     <p className="text-[#A27B5C]/10 font-thin bg-[#A27B5C]/1">
//                         Browse, Bid, Acquire
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }


'use client';

import Image from 'next/image';

export const Banner = () => {
    return (
        <div className="relative w-full h-[450px] sm:h-[620px] bg-[#361500]/50">
            <Image
                src="/empty-auditorium-awaiting-big-performance-ahead-generated-by-ai.jpg"
                alt="Home Banner"
                fill
                style={{ objectFit: 'cover', opacity: 0.5 }}
                priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-2 text-center px-4 sm:px-8">
                <div>
                    <h1 className="text-[#DCD7C9] font-thin tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Auctregal
                    </h1>

                    <p className="text-white font-thin bg-[#1C0A00]/70 px-4 py-2 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl">
                        Browse unique items, place bids, and acquire treasures on Auctregal
                    </p>

                </div>
            </div>
        </div>
    );
};
