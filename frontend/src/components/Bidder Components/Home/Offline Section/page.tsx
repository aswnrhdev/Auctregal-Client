'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const OfflineReg = () => {
  const router = useRouter();

  const handleOfflineRoute = () => {
    router.push('/offline');
  };

  return (
    <div className="relative w-full bg-[#3C3633]">
      <div className="relative w-full h-[630px]">
        <Image
          src="/empty-auditorium-awaiting-big-performance-ahead-generated-by-ai.jpg"
          alt="Home Banner"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          className="absolute inset-0"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4 px-5 md:px-10">
        <div className="text-center">
          <h1 className="text-white font-thin tracking-tight text-4xl md:text-5xl lg:text-7xl cursor-pointer">
            Mega Auction
          </h1>
          <p className="text-white font-thin mt-1">
            Join us for the Auctregal Mega Auction on September 9, 2024, at 2:00 PM, hosted at the prestigious Septimum Hall. <br />
            Register now to secure your spot and participate in this exciting event.
          </p>
        </div>
        <button 
          className="bg-[#747264] text-white font-thin px-6 py-2 cursor-pointer"
          onClick={handleOfflineRoute}
        >
          Register now
        </button>
      </div>
    </div>
  );
};
