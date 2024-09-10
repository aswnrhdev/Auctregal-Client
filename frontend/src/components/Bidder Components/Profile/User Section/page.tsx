



// 'use client'

// import React, { useState, useEffect } from 'react';
// import { IoIosSave } from 'react-icons/io';
// import { CiEdit } from 'react-icons/ci';
// import { FcCancel } from 'react-icons/fc';
// import { FaCopy } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/store';
// import { setUserData } from '@/features/user/userSlice';
// import axios from 'axios';

// const UserInformation = () => {
//     const [image, setImage] = useState<string | null>(null);
//     const [name, setName] = useState<string>('');
//     const [isEditing, setIsEditing] = useState(false);
//     const [isCancelEnabled, setIsCancelEnabled] = useState(false);

//     const { email, auctCode, walletBalance } = useSelector((state: RootState) => state.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         // Fetch user data from the backend or local state
//         const fetchUserData = async () => {
//             if (email) {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/user?email=${email}`);
//                     const userData = response.data;
//                     setName(userData.name);
//                     setImage(userData.image ? userData.image : null);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [email]);

//     const handleCopy = () => {
//         navigator.clipboard.writeText(auctCode || '');
//         alert('Code copied to clipboard!');
//     };

//     const handleEditClick = () => {
//         setIsEditing(true);
//         setIsCancelEnabled(true);
//     };

//     const handleSaveClick = async () => {
//         setIsEditing(false);
//         setIsCancelEnabled(false);
    
//         try {
//             const response = await axios.put('http://localhost:5000/user', { name, image, email }); // Ensure email is included if needed
//             dispatch(setUserData(response.data));
//         } catch (error) {
//             console.error('Error saving user data:', error);
//         }
//     };
    

//     const handleCancelClick = () => {
//         setIsEditing(false);
//         setIsCancelEnabled(false);
//         // Optionally, refetch user data to revert changes
//     };

//     const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);

//             try {
//                 const response = await axios.post('http://localhost:5000/upload', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//                 setImage(response.data.fileUrl);
//             } catch (error) {
//                 console.error('Error uploading image:', error);
//             }
//         }
//     };

//     return (
//         <div className='flex flex-col bg-[#2C3639] text-[#A27B5C] p-10'>
//             <div className="pb-10 bg-[#3F4E4F] text-[#DCD7C9] mt-5 font-normal border-[#DCD7C9] border-l-8 pt-5">
//                 <div className='text-center mb-5 mt-5'>
//                     <h1 className='font-thin text-5xl tracking-tighter'>Personal Information</h1>
//                     <p className='font-thin'>Bidding fosters competition, and a bidder's value is highlighted by their strategic choices and willingness to invest in unique opportunities</p>
//                 </div>

//                 <div className='text-center'>
//                     <h1 className='font-thin'>Your Auct Code is given below</h1>
//                     <div className='flex justify-center items-center mt-2'>
//                         <p className='font-normal text-[#A27B5C] mr-2'>{auctCode}</p>
//                         <button onClick={handleCopy} className='text-[#A27B5C]'>
//                             <FaCopy size={15} />
//                         </button>
//                     </div>
//                 </div>

//                 <div className='flex flex-col gap-3'>
//                     {/* Image Upload Field */}
//                     <div className='flex justify-center mt-6'>
//                         <div className='relative'>
//                             <input
//                                 type='file'
//                                 id='profile-image'
//                                 className='hidden'
//                                 onChange={handleImageChange}
//                                 disabled={!isEditing}
//                             />
//                             <label htmlFor='profile-image' className={`cursor-pointer ${!isEditing ? 'pointer-events-none' : ''}`}>
//                                 <div className='w-24 h-24 rounded-full border-2 border-[#DCD7C9] flex items-center justify-center overflow-hidden'>
//                                     {image ? (
//                                         <img src={image} alt='Profile' className='w-full h-full object-cover' />
//                                     ) : (
//                                         <span className='text-sm'>Upload Image</span>
//                                     )}

//                                 </div>
//                             </label>
//                         </div>
//                     </div>

//                     {/* Name and Email Fields */}
//                     <div className='flex flex-col w-full max-w-sm mx-auto space-y-4'>
//                         {/* Name Field */}
//                         <div className='flex flex-col'>
//                             <input
//                                 type='text'
//                                 id='name'
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
//                                 placeholder='Name'
//                                 readOnly={!isEditing}
//                             />
//                         </div>

//                         {/* Email Field */}
//                         <div className='flex flex-col'>
//                             <input
//                                 type='email'
//                                 id='email'
//                                 value={email || ''}
//                                 className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
//                                 placeholder='Email'
//                                 readOnly
//                             />
//                         </div>
//                     </div>

//                     <div className='flex items-center justify-center gap-5'>
//                         <button
//                             className='bg-[#DCD7C9] text-[#2C3639] px-8 py-2 rounded-md transform transition-transform duration-300 hover:scale-105'
//                             onClick={isEditing ? handleSaveClick : handleEditClick}
//                         >
//                             {isEditing ? <IoIosSave /> : <CiEdit />}
//                         </button>
//                         <button
//                             className={`bg-red-950 text-white px-8 py-2 rounded-md transform transition-transform duration-300 hover:scale-105 ${!isCancelEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             onClick={handleCancelClick}
//                             disabled={!isCancelEnabled}
//                         >
//                             <FcCancel />
//                         </button>
//                     </div>
//                 </div>

//                 <div className=' p-10'>
//                     <h1 className='font-thin text-3xl tracking-tighter'>Wallet Information</h1>
//                     <p className='font-thin'>The wallet provides details of your recent transactions, including the amount and history.</p>

//                     <div>
//                         <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal border-[#A27B5C] border-l-8 w-1/4">
//                             <div className='flex items-center gap-10 ml-5'>
//                                 <p>Wallet Balance</p>
//                                 <p>₹{walletBalance?.toLocaleString()}</p>
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//                 <div className=' pl-10'>
//                     <h1 className='font-thin text-3xl tracking-tighter'>Bidding History</h1>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserInformation;



'use client'

import React, { useState, useEffect } from 'react';
import { IoIosSave } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
import { FcCancel } from 'react-icons/fc';
import { FaCopy } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUserData } from '@/features/user/userSlice';
import axios from 'axios';
import Image from 'next/image';

const UserInformation = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [isCancelEnabled, setIsCancelEnabled] = useState(false);

    const { email, auctCode, walletBalance } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch user data from the backend or local state
        const fetchUserData = async () => {
            if (email) {
                try {
                    const response = await axios.get(`http://localhost:5000/user?email=${email}`);
                    const userData = response.data;
                    setName(userData.name);
                    setImage(userData.image ? userData.image : null);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [email]);

    const handleCopy = () => {
        navigator.clipboard.writeText(auctCode || '');
        alert('Code copied to clipboard!');
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsCancelEnabled(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        setIsCancelEnabled(false);
    
        try {
            const response = await axios.put('http://localhost:5000/user', { name, image, email }); // Ensure email is included if needed
            dispatch(setUserData(response.data));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };
    

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsCancelEnabled(false);
        // Optionally, refetch user data to revert changes
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
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

    return (
        <div className='flex flex-col bg-[#2C3639] text-[#A27B5C] p-10'>
            <div className="pb-10 bg-[#3F4E4F] text-[#DCD7C9] mt-5 font-normal border-[#DCD7C9] border-l-8 pt-5">
                <div className='text-center mb-5 mt-5'>
                    <h1 className='font-thin text-5xl tracking-tighter'>Personal Information</h1>
                    <p className='font-thin'>Bidding fosters competition, and a bidder&apos;s value is highlighted by their strategic choices and willingness to invest in unique opportunities</p>
                </div>

                <div className='text-center'>
                    <h1 className='font-thin'>Your Auct Code is given below</h1>
                    <div className='flex justify-center items-center mt-2'>
                        <p className='font-normal text-[#A27B5C] mr-2'>{auctCode}</p>
                        <button onClick={handleCopy} className='text-[#A27B5C]'>
                            <FaCopy size={15} />
                        </button>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    {/* Image Upload Field */}
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
                                        <Image src={image} alt='Profile' layout="fill" objectFit="cover" />
                                    ) : (
                                        <span className='text-sm'>Upload Image</span>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Name and Email Fields */}
                    <div className='flex flex-col w-full max-w-sm mx-auto space-y-4'>
                        {/* Name Field */}
                        <div className='flex flex-col'>
                            <input
                                type='text'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
                                placeholder='Name'
                                readOnly={!isEditing}
                            />
                        </div>

                        {/* Email Field */}
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
                            className='bg-[#DCD7C9] text-[#2C3639] px-8 py-2 rounded-md transform transition-transform duration-300 hover:scale-105'
                            onClick={isEditing ? handleSaveClick : handleEditClick}
                        >
                            {isEditing ? <IoIosSave /> : <CiEdit />}
                        </button>
                        <button
                            className={`bg-red-950 text-white px-8 py-2 rounded-md transform transition-transform duration-300 hover:scale-105 ${!isCancelEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleCancelClick}
                            disabled={!isCancelEnabled}
                        >
                            <FcCancel />
                        </button>
                    </div>
                </div>

                <div className=' p-10'>
                    <h1 className='font-thin text-3xl tracking-tighter'>Wallet Information</h1>
                    <p className='font-thin'>The wallet provides details of your recent transactions, including the amount and history.</p>

                    <div>
                        <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal border-[#A27B5C] border-l-8 w-1/4">
                            <div className='flex items-center gap-10 ml-5'>
                                <p>Wallet Balance</p>
                                <p>₹{walletBalance?.toLocaleString()}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className=' pl-10'>
                    <h1 className='font-thin text-3xl tracking-tighter'>Bidding History</h1>

                </div>
            </div>
        </div>
    );
};

export default UserInformation;
