'use client'

import { motion } from 'framer-motion'

const Banner = () => {
    return (
        <div className="relative w-full">
            <motion.img
                src="businessmen-handshake.jpg"
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
                    <h1 className="text-white font-bold tracking-tight text-7xl">About Us</h1>
                    <p className="text-white text-md">
                        Auctregal is a platform that has been celebrating value and pride for 20 wonderful years! <br />
                        We cherish every seller's item and joyfully serve as the bridge connecting enthusiastic bidders.
                    </p>
                </motion.div>
                <button className="bg-white text-black px-8 py-2 rounded-full">See More</button>
            </div>
        </div>
    )
}

export default Banner
