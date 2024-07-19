'use client'

import { motion } from 'framer-motion'


export const LiveHome = () => {
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
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center">
                    <h1 className="text-white font-bold tracking-tight text-7xl">LIVE BIDDING</h1>
                    <p className="text-white text-md">
                    Be part of the live auction for the iconic Ford Mustang tonight at 8 PM. <br />This is your opportunity to acquire a classic muscle car of unparalleled significance. Register now to take part in the bidding process!
                    </p>
                </motion.div>
                <button className="bg-white text-black px-8 py-2 rounded-full">Register now</button>
            </div>
        </div>
    )
}
