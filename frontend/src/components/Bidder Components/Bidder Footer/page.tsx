// 'use client'
// import { motion } from 'framer-motion';
// import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";

// const iconVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
// };

// const sectionVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
// };

// export const Footer = () => {
//   return (
//     <footer className="bg-[#DCD7C9] text-[#2C3639] p-8 w-full font-sans flex flex-col items-center gap-4">
//       <motion.div
//         className="text-center"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={sectionVariants}
//       >
//         <p className="text-sm">info@auctregal</p>
//         <motion.div
//           className="flex gap-4 mt-4 text-xl justify-center"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={iconVariants}
//         >
//           <FaInstagram />
//           <FaTwitter />
//           <SiGmail />
//           <FaTelegramPlane />
//         </motion.div>
//         <p className="text-sm mt-4">© {new Date().getFullYear()} Auctregal. All rights reserved.</p>
//         {/* <p className="text-sm mt-4">
//           © {new Date().getFullYear()} Auctregal. All rights reserved. 
//           <a href="/terms" className="text-gray-300 hover:underline ml-1">Terms & Conditions</a>
//         </p> */}
//       </motion.div>
//     </footer>
//   )
// }


import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="bg-[#DCD7C9] text-[#2C3639] p-8 w-full font-sans flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-sm">info@auctregal</p>
        <div className="flex gap-4 mt-4 text-xl justify-center">
          <FaInstagram />
          <FaTwitter />
          <SiGmail />
          <FaTelegramPlane />
        </div>
        <p className="text-sm mt-4">© {new Date().getFullYear()} Auctregal. All rights reserved.</p>
        {/* <p className="text-sm mt-4">
          © {new Date().getFullYear()} Auctregal. All rights reserved. 
          <a href="/terms" className="text-gray-300 hover:underline ml-1">Terms & Conditions</a>
        </p> */}
      </div>
    </footer>
  )
}
