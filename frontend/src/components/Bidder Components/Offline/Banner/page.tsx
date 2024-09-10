'use client'

import { motion } from 'framer-motion'

const Banner = () => {
    return (
        <div className="relative w-full">
            <motion.img
                src="retro-world-theatre-day-scenes-with-incredible-view-royal-theatre.jpg"
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
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center">
                    <h1 className="text-white font-bold tracking-tight text-7xl">Mega Auction</h1>
                    <p className="text-white text-md mt-2">
                        Join us on 09/09/24 at Septimum Hall, 2:00 PM
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Banner
