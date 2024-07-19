import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa"
import { SiGmail } from "react-icons/si"


const Footer = () => {
    return (
        <footer className="footer bg-black text-white p-10 flex justify-between mr-10 ml-10  mb-10 mt-8 ">
            <aside className="cursor-pointer">
                <p className="font-bold text-5xl tracking-tight">Auct<span className="text-white text-2xl tracking-normal italic">regal</span></p>
                <p>authregal@info.in</p>
                <div className="flex gap-5 mt-5">
                    <FaInstagram />
                    <FaTwitter />
                    <SiGmail />
                    <FaTelegramPlane />
                </div>
            </aside>
            <nav className="flex flex-col gap-1 cursor-pointer">
                <h6 className="footer-title mb-4">Quick Links</h6>
                <a className="link link-hover">Seller Home</a>
                <a className="link link-hover">Login</a>
                <a className="link link-hover">Register</a>
            </nav>
            <nav className="flex flex-col gap-1 cursor-pointer">
                <h6 className="footer-title mb-4">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
                <a className="link link-hover">Refund Policy</a>
            </nav>
            <nav className="flex flex-col gap-1 cursor-pointer">
                <h6 className="footer-title mb-4">Seller Resources</h6>
                <a className="link link-hover">How to Sell</a>
                <a className="link link-hover">Seller Dashboard</a>
                <a className="link link-hover">Support for Seller</a>
                <a className="link link-hover">Seller Protection</a>
            </nav>

        </footer>
    )
}

export default Footer