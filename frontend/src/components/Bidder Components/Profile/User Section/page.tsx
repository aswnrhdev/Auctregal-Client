'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUserData } from '@/features/user/userSlice';
import axios from 'axios';
import Image from 'next/image';
import { IoIosSave } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { FcCancel } from 'react-icons/fc';
import { FaCopy } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface Bid {
    itemTitle: string;
    category: string;
    bidStatus: string;
    bidResult: string;
    transactionStatus: string;
    bidAmount: string;
    hasBiddingToken: boolean;
}

const UserInformation = () => {
    const user = useSelector((state: RootState) => state.user);

    const [image, setImage] = useState<string | null>(null);
    const [walletBalance, setWalletBalance] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [isCancelEnabled, setIsCancelEnabled] = useState(false);
    const [biddingHistory, setBiddingHistory] = useState<Bid[]>([]);

    const dispatch = useDispatch();
    const { id, name, email, auctCode } = user;

    useEffect(() => {
        const fetchUserData = async () => {
            if (email) {
                try {
                    const response = await axios.get(`https://auctregal.rudopedia.shop/user?email=${email}`);
                    const userData = response.data;
                    setImage(userData.image || null);
                    setWalletBalance(userData.walletBalance || '0');
                    setBiddingHistory(userData.biddingHistory || []);
                    dispatch(setUserData({
                        id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        role: userData.role,
                        token: userData.token,
                        auctCode: userData.auctCode
                    }));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [email, dispatch]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserData({ ...user, name: e.target.value }));
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && email) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('email', email);

            try {
                const response = await axios.post('https://auctregal.rudopedia.shop/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setImage(response.data.fileUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(auctCode || '');

        Swal.fire({
            toast: true,
            position: 'top',
            text: 'AuctCode copied to your clipboard!',
            showConfirmButton: false,
            timer: 2000,
            background: 'black',
            color: 'white',
            customClass: {
                popup: 'swal-toast',
                title: 'swal-toast-title'
            }
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsCancelEnabled(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        setIsCancelEnabled(false);

        try {
            const response = await axios.put('https://auctregal.rudopedia.shop/user', { name, image, email });
            dispatch(setUserData({
                ...response.data,
                token: response.data.token || '',
            }));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsCancelEnabled(false);
    };

    return (
        <div className='flex flex-col bg-[#603601] text-[#A27B5C] p-6 md:p-10'>
            <div className="pb-10 bg-[#361500] text-[#DCD7C9] mt-5 font-normal border-[#CC9544] border-l-8 pt-5 px-4 sm:px-6 md:px-8">
                <div className='text-center mb-5 mt-5'>
                    <h1 className='font-thin text-3xl sm:text-4xl md:text-5xl tracking-tighter'>Personal Information</h1>
                    <p className='font-thin text-sm sm:text-base'>Bidding fosters competition, and a bidder&apos;s value is highlighted by their strategic choices...</p>
                </div>

                <div className='text-center'>
                    <h1 className='font-thin text-lg sm:text-xl md:text-2xl'>Your Auct Code is given below</h1>
                    <div className='flex justify-center items-center mt-2'>
                        <p className='font-normal text-[#A27B5C] mr-2 text-sm sm:text-base'>{auctCode}</p>
                        <button onClick={handleCopy} className='text-[#A27B5C]'>
                            <FaCopy size={15} />
                        </button>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='flex justify-center mt-6'>
                        <div className='relative'>
                            <input
                                type='file'
                                id='profile-image'
                                className='hidden'
                                onChange={handleImageChange}
                                disabled={!isEditing}
                            />
                            <label htmlFor='profile-image' className={`cursor-pointer ${!isEditing ? 'pointer-events-none' : ''}`}>
                                <div className='w-24 h-24 rounded-full border-2 border-[#DCD7C9] flex items-center justify-center overflow-hidden'>
                                    {image ? (
                                        <img src={image} alt="Profile" width={96} height={96} style={{ objectFit: "cover" }} />

                                    ) : (
                                        <span className='text-xs sm:text-sm'>Upload Image</span>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='flex flex-col w-full max-w-sm mx-auto space-y-4'>
                        <div className='flex flex-col'>
                            <input
                                type='text'
                                id='name'
                                value={name || ''}
                                onChange={handleNameChange}
                                className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
                                placeholder='Name'
                                readOnly={!isEditing}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <input
                                type='email'
                                id='email'
                                value={email || ''}
                                className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
                                placeholder='Email'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-5'>
                        <button
                            className='bg-[#DCD7C9] text-[#2C3639] px-6 sm:px-8 py-2 rounded-md transform transition-transform duration-300 hover:scale-105'
                            onClick={isEditing ? handleSaveClick : handleEditClick}
                        >
                            {isEditing ? <IoIosSave /> : <CiEdit />}
                        </button>
                        <button
                            className={`bg-red-950 text-white px-6 sm:px-8 py-2 rounded-md transform transition-transform duration-300 hover:scale-105 ${!isCancelEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleCancelClick}
                            disabled={!isCancelEnabled}
                        >
                            <FcCancel />
                        </button>
                    </div>
                </div>

                <div className='p-6 sm:p-8 text-center'>
                    <h1 className='font-thin text-2xl sm:text-3xl tracking-tighter mb-5'>Wallet Information</h1>
                    <p className='font-thin text-sm sm:text-base'>The wallet provides details of your recent transactions, including the amount and history.</p>

                    <div>
                        <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal border-[#CC9544] border-l-8 w-full max-w-md mx-auto">
                            <div className='flex items-center gap-4 ml-5'>
                                <p>Wallet Balance</p>
                                <p>{walletBalance?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pl-6 sm:pl-8 pb-10'>
                    <h1 className='font-thin text-2xl sm:text-3xl tracking-tighter mb-5'>Bidding History</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#361500] text-[#DCD7C9]">
                            <thead>
                                <tr className="border-b border-[#A27B5C]">
                                    <th className="py-2 px-4 text-left font-thin text-sm sm:text-base">Item Name</th>
                                    <th className="py-2 px-4 text-left font-thin text-sm sm:text-base">Category</th>
                                    <th className="py-2 px-4 text-left font-thin text-sm sm:text-base">Bid Status</th>
                                    <th className="py-2 px-4 text-left font-thin text-sm sm:text-base">Bid Result</th>
                                    <th className="py-2 px-4 text-left font-thin text-sm sm:text-base">Transaction Status</th>
                                    {/* <th className="py-2 px-4 text-left font-thin text-sm sm:text-base">Bid Amount</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {biddingHistory.map((bid, index) => (
                                    <tr key={index} className="border-b border-[#A27B5C] font-thin">
                                        <td className="py-2 px-4 text-sm sm:text-base">{bid.itemTitle}</td>
                                        <td className="py-2 px-4 text-sm sm:text-base">{bid.category}</td>
                                        <td className="py-2 px-4 text-sm sm:text-base">{bid.bidStatus}</td>
                                        <td className="py-2 px-4 text-sm sm:text-base">{bid.bidResult}</td>
                                        <td className="py-2 px-4 text-sm sm:text-base">{bid.transactionStatus}</td>
                                        {/* <td className="py-2 px-4 text-sm sm:text-base">{bid.bidAmount}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;
