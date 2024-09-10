'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export const LiveHome = () => {

    const router = useRouter();

    const handleLivePageRoute = () => {
        router.push('/live')
    }

    return (
        <div className="relative w-full mt-10">
            <motion.img
                src="view-car-running-high-speed (2).jpg"
                alt="Home Banner"
                style={{
                    width: '100%',
                    height: '530px',
                    objectFit: 'cover',
                    opacity: 0.5,
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center"
                >
                    <h1 className="text-white font-bold tracking-tight text-4xl md:text-5xl lg:text-7xl transition-transform duration-300 ease-in-out hover:scale-105 hover:text-[#a86e3a] cursor-pointer">
                        LIVE BIDDING
                    </h1>

                    <p className="text-white text-sm md:text-md lg:text-lg mt-4">
                        Be part of the live auction for the iconic Ford Mustang tonight at 8 PM. <br />
                        This is your opportunity to acquire a classic muscle car of unparalleled significance. Register now to take part in the bidding process!
                    </p>
                </motion.div>
                <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full transition-colors duration-300 ease-in-out hover:bg-[#a86e3a] hover:text-white"
                    onClick={() => handleLivePageRoute()}>
                    Register now
                </button>
            </div>
        </div>
    )
}
