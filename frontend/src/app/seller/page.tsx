
'use client'

import Footer from '@/components/Seller Components/Footer/Footer';
// import Header from '@/components/Seller Components/Header/Header';
import Header from '@/components/Header/bidderHeader';
// import Banner from "@/components/About/Banner/banner"
import Banner from '@/components/Seller/Banner/banner';
import RecentSoldItems from '@/components/Seller Components/Home/Recent Sold Section/page';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

// Sample data for the modal and top sold items
const modalContent = {
    title: 'Instructions for Sellers',
    instructions: [
        { text: 'A registration fee of approximately $100 is required during the seller registration process.', highlight: 'Registration Fee' },
        { text: 'Ensure your item is listed under the appropriate category.', highlight: 'Category Selection', details: ['Art and Antiques', 'Jewelry and Watches', 'Vehicles', 'Wine and Spirits', 'Rare Books and Manuscripts'] },
        { text: 'Choose a starting price for your auction.', highlight: 'Base Price' },
        { text: 'Both virtual and physical verification will be conducted for your product.', highlight: 'Verification Process' },
        { text: 'Once verified, your product will be listed in the "Upcoming Bids" section.', highlight: 'Auction Placement', details: ['Once verified, your product will be listed in the "Upcoming Bids" section.', 'If your item receives a minimum of 5 interests, it will proceed to the bidding phase.'] },
        { text: 'Keeping your item at our franchise costs approximately $100 per day as well.', highlight: 'Franchise Cost' },
        { text: 'Upon successful bidding and delivery to the buyer, the final sale price minus the 10% commission will be transferred to your designated bank account or Auctregal wallet.', highlight: 'Payment Process' },
        { text: 'Sellers must adhere to our guidelines. Spamming or listing inappropriate items may result in a decrease in your seller score, affecting your access to the platform.', highlight: 'Seller Conduct' },
    ]
};



const Page = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <Header />
            <Banner />

            <div className=" flex flex-col items-center">
                <h2 className="text-white font-semibold text-4xl mt-8 text-center mb-2">Instructions for Sellers</h2>
                <p className="text-white text-center mb-5">Please review these instructions carefully before listing your items for auction.</p>
                <button
                    onClick={toggleModal}
                    className="bg-[#FFC100] text-black py-2 px-14 rounded-lg"
                >
                    Tap to See Instructions
                </button>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-black p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 ">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white font-bold text-3xl">{modalContent.title}</h2>
                                {/* <button onClick={toggleModal} className="text-white">
                                    <AiOutlineClose size={24} />
                                </button> */}
                            </div>
                            <div className="mt-5 flex flex-col gap-2">
                                {modalContent.instructions.map((instruction, index) => (
                                    <div key={index} className="text-white">
                                        <p>
                                            <span className="text-[#FFC100]">{instruction.highlight}</span>: {instruction.text}
                                        </p>
                                        {instruction.details && (
                                            <ul className="text-white pl-6 list-decimal">
                                                {instruction.details.map((detail, i) => (
                                                    <li key={i}>{detail}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                                <p className='text-white'>For more info, please contact <span className='text-[#FFC100]'>authregal@info.in</span></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <hr className="border-t-2 border-gray-300 mt-10 mx-auto w-1/2 mb-10" />
            <RecentSoldItems />
            <hr className="border-t-2 border-gray-300 mt-10 mx-auto w-1/2 mb-10" />
            <Footer />
        </>
    );
}

export default Page;
