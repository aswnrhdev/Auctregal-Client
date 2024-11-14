import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="bg-[#DCD7C9] text-[#2C3639] w-full font-sans flex flex-col items-center pt-5 pb-5">
      <div className="text-center">
        <p className="text-sm">info@auctregal.com</p>
      </div>

      <div className="flex gap-4 mt-4 text-xl justify-center">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-[#603601] transition-colors duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-[#603601] transition-colors duration-300" />
        </a>
        <a href="mailto:info@auctregal.com">
          <SiGmail className="hover:text-[#603601] transition-colors duration-300" />
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane className="hover:text-[#603601] transition-colors duration-300" />
        </a>
      </div>

      <div className="text-center">
        <p className="text-sm mt-4">© {new Date().getFullYear()} Auctregal. All rights reserved.</p>
      </div>
    </footer>
  );
};
