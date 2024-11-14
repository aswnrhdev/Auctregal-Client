'use client'

import Image from 'next/image';

const AuctionBanner = () => {
    return (
        <div className="relative w-full bg-[#361500] h-[230px] sm:h-[300px] lg:h-[400px]">
            <Image
                src="/retro-world-theatre-day-scenes-with-incredible-view-royal-theatre.jpg"
                alt="Home Banner"
                layout="fill"
                objectFit="cover"
                style={{ opacity: 0.5 }}
                priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="text-center">
                    <h1 className="text-[#DCD7C9] font-thin tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Current Auction Items
                    </h1>
                    <p className="text-[#DCD7C9] text-base sm:text-lg md:text-xl lg:text-2xl">
                        Explore our exclusive collection of items currently up for auction.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuctionBanner;
