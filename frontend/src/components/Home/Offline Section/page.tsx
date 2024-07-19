// export const OfflineReg = () => {
//     return (
//         <div className="relative w-full h-screen">
//             <img src="female-business-executive-giving-speech.jpg" alt="Home Banner" className="w-full h-full object-cover" />
//             <div className="absolute top-1/3 left-20 transform -translate-y-1/1 z-10">
//                 <h1 className="font-sans font-bold tracking-tight text-white text-5xl mb-3">Mega Auction</h1>
//                 <h1 className="font-sans font-bold tracking-tight text-white text-7xl mb-3">Auctregal Mega Auction Coming Soon</h1>
//                 <p className="font-sans text-white text-xl mb-5">
//                 Join us on 09/09/24 at Septimum Hall, 2:00 PM.
//                 </p>
//                 <button className="bg-white text-black px-16 py-2 rounded-lg">Register</button>
//             </div>
//         </div>
//     )
// }

'use client'

import { motion } from 'framer-motion'

export const OfflineReg = () => {
    return (
        <div className="relative w-full mt-10">
            <motion.img
                src="empty-auditorium-awaiting-big-performance-ahead-generated-by-ai.jpg"
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
            <div className="absolute inset-0 flex flex-col items-start justify-center z-10 gap-3 pl-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-start">
                    <h1 className="text-white font-bold tracking-tight text-7xl mb-2">Mega Auction</h1>
                    
                    <p className="text-white text-md">
                    Join us for the Auctregal Mega Auction on September 9, 2024, at 2:00 PM, hosted at the prestigious Septimum Hall. <br />Register now to secure your spot and participate in this exciting event. For more information, please visit our <span className=' cursor-pointer'>About page</span>.
                    </p>
                </motion.div>
                <button className="bg-white text-black px-8 py-2 rounded-full">Register now</button>
            </div>
        </div>
    )
}