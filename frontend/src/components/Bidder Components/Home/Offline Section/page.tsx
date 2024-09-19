'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const OfflineReg = () => {
  const router = useRouter();

  const handleOfflineRoute = () => {
    router.push('/offline');
  };

  return (
    <div className="relative w-full bg-[#361500]">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[630px]">
        <Image
          src="/retro-world-theatre-day-scenes-with-incredible-view-royal-theatre.jpg"
          alt="Home Banner"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          className="absolute inset-0"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4 px-5 md:px-10">
        <div className="text-center">
          <h1 className="text-white font-thin tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-7xl cursor-pointer">
            Mega Auction
          </h1>
          <p className="text-white font-thin mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Join us for the Auctregal Mega Auction on September 9, 2024, at 2:00 PM, <br />
            hosted at the prestigious Septimum Hall. Register now to secure your spot <br />
            and participate in this exciting event.
          </p>
        </div>
        <button 
          className="bg-[#603601] text-white font-thin px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 cursor-pointer"
          onClick={handleOfflineRoute}
        >
          Register now
        </button>
      </div>
    </div>
  );
};
