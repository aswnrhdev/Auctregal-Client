'use client'

import Image from 'next/image'

const Banner = () => {
    return (
        <div className="relative w-full h-[230px] bg-[#A27B5C]">
            <Image
                src="/pirate-artifacts-arrangement-still-life.jpg"
                alt="Home Banner"
                layout="fill" // Makes the image cover the entire div
                objectFit="cover" // Ensures the image covers the div
                className="opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6">
                <div className="text-center">
                    <h1 className="text-[#DCD7C9] font-thin text-5xl">Auction Details Page</h1>
                    <p className="font-thin">Here, you&apos;ll find comprehensive information on each item, ensuring you have all the details you need to make informed bids</p>
                </div>
            </div>
        </div>
    )
}

export default Banner
