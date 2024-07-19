'use client'

import { motion } from 'framer-motion'

export const Banner = () => {
    return (
        <div className="relative w-full">
            <motion.img
                src="silhouettes-businessmen-applauding-backlit-auditorium-generated-by-ai.jpg"
                alt="Home Banner"
                style={{
                    width: '100%',
                    height: '660px',
                    objectFit: 'cover',
                    opacity: 0.5,
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 flex flex-col items-end justify-center z-10 gap-6 pr-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-end">
                    <h1 className="text-white font-bold tracking-tight text-7xl mb-2">Auctregal</h1>
                    <p className="text-white text-md">
                        Welcome to Auctregal, <br />
                        Our platform transcends the ordinary, offering a regal experience for discerning bidders and sellers alike.
                        Here, <br />every bid is not just a transaction but a journey towards unveiling rare and unique treasures.
                    </p>
                </motion.div>
                <button className="bg-white text-black px-8 py-2 rounded-full">Join</button>
            </div>
        </div>
    )
}
