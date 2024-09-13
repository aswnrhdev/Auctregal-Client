// 'use client';

// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { FaSpinner } from 'react-icons/fa';
// import { IoCheckmarkDoneSharp } from "react-icons/io5";
// import { FcCancel } from "react-icons/fc";

// interface BiddingFormProps {
//     itemId: string;
//     basePrice: number;
//     currentPrice: number;
//     onBidPlaced: (bidAmount: number) => void;
// }

// const BiddingForm: React.FC<BiddingFormProps> = ({ itemId, basePrice, currentPrice, onBidPlaced }) => {
//     const [biddingToken, setBiddingToken] = useState<string>('');
//     const [selectedPercentage, setSelectedPercentage] = useState<string>('');
//     const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');
    
//     const userEmail = useSelector((state: any) => state.user.email) as string;

//     const percentageOptions = [
//         { value: '5', label: '5%' },
//         { value: '10', label: '10%' },
//         { value: '15', label: '15%' },
//         { value: '20', label: '20%' },
//     ];

//     const calculateBidAmount = (percentage: string): number => {
//         const increment = currentPrice * (parseInt(percentage) / 100);
//         return currentPrice + increment;
//     };

//     const handleTokenValidation = async () => {
//         setIsLoading(true);
//         setError('');

//         try {
//             const response = await axios.post('https://auctregal.rudopedia.shop/validate-bidding-token', {
//                 itemId,
//                 token: biddingToken,
//                 email: userEmail
//             });
//             setIsTokenValid(response.data.isValid);
//             if (!response.data.isValid) {
//                 setError('Invalid bidding token');
//             }
//         } catch (error) {
//             console.error('Error validating token:', error);
//             setError('Error validating token');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBidSubmit = async () => {
//         if (!isTokenValid) {
//             setError('Please enter a valid bidding token first');
//             return;
//         }

//         if (!selectedPercentage) {
//             setError('Please select a bid percentage');
//             return;
//         }

//         const bidAmount = calculateBidAmount(selectedPercentage);

//         try {
//             const response = await axios.post('https://auctregal.rudopedia.shop/place-bid', {
//                 itemId,
//                 token: biddingToken,
//                 email: userEmail,
//                 bidAmount: bidAmount
//             });
//             if (response.data.success) {
//                 alert('Bid placed successfully!');
//                 setBiddingToken('');
//                 setSelectedPercentage('');
//                 setIsTokenValid(false);
//                 setError('');
//                 onBidPlaced(bidAmount);
//             } else {
//                 setError(response.data.message || 'Failed to place bid');
//             }
//         } catch (error) {
//             console.error('Error placing bid:', error);
//             setError('Error placing bid');
//         }
//     };

//     return (
//         <div className="flex items-center justify-start">
//             <div className="w-[550px] flex flex-col justify-center">
//                 <h3 className="text-xl font-thin mt-2">Place a Bid</h3>
//                 <p className='font-thin mb-5'>Please enter your bidding token for this item to verify it. Once verified, you can proceed to increase your bid by your selected percentage</p>
//                 <div className="mb-4">
//                     <div className="flex">
//                         <input
//                             type="text"
//                             value={biddingToken}
//                             onChange={(e) => setBiddingToken(e.target.value)}
//                             className="font-normal mt-1 block w-full px-3 py-4 bg-[#603601] text-white rounded-md shadow-sm focus:outline-none outline-none"
//                             placeholder="Bidding Token"
//                         />
//                         <button
//                             onClick={handleTokenValidation}
//                             className={`font-normal ml-2 flex items-center justify-center py-4 px-6 rounded-md focus:outline-none focus:ring-2 ${isTokenValid ? 'bg-[#1C0A00] text-white' : 'bg-[#1C0A00] text-white hover:bg-black hover:scale-110 transition-transform duration-500'} ${isLoading || !biddingToken ? 'cursor-not-allowed' : ''}`}
//                             disabled={isLoading || !biddingToken}
//                             style={{ width: '120px' }}
//                         >
//                             {isLoading ? (
//                                 <FaSpinner className="animate-spin" />
//                             ) : isTokenValid ? (
//                                 <IoCheckmarkDoneSharp className="text-green-500" />
//                             ) : error ? (
//                                 <FcCancel />
//                             ) : (
//                                 'Verify'
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 <div className="mb-4">
//                     <select
//                         value={selectedPercentage}
//                         onChange={(e) => setSelectedPercentage(e.target.value)}
//                         className="mt-1 block w-full px-3 py-4 text-white rounded-md shadow-sm focus:outline-none bg-[#603601]"
//                         disabled={!isTokenValid}
//                     >
//                         <option value="">Select percentage</option>
//                         {percentageOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label} (+{calculateBidAmount(option.value).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })})
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <button
//                     onClick={handleBidSubmit}
//                     disabled={!isTokenValid || !selectedPercentage}
//                     className="w-full bg-[#1C0A00] text-white py-4 px-4 rounded-md hover:bg-black hover:scale-110 transition-transform duration-500 cursor-pointer"
//                 >
//                     Place Bid
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BiddingForm;



'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import Swal from 'sweetalert2';

interface BiddingFormProps {
    itemId: string;
    basePrice: number;
    currentPrice: number;
    onBidPlaced: (bidAmount: number) => void;
}

const BiddingForm: React.FC<BiddingFormProps> = ({ itemId, basePrice, currentPrice, onBidPlaced }) => {
    const [biddingToken, setBiddingToken] = useState<string>('');
    const [selectedPercentage, setSelectedPercentage] = useState<string>('');
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const userEmail = useSelector((state: any) => state.user.email) as string;

    const percentageOptions = [
        { value: '5', label: '5%' },
        { value: '10', label: '10%' },
        { value: '15', label: '15%' },
        { value: '20', label: '20%' },
    ];

    const calculateBidAmount = (percentage: string): number => {
        const increment = currentPrice * (parseInt(percentage) / 100);
        return currentPrice + increment;
    };

    const handleTokenValidation = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/validate-bidding-token', {
                itemId,
                token: biddingToken,
                email: userEmail
            });
            setIsTokenValid(response.data.isValid);
            if (!response.data.isValid) {
                setError('Invalid bidding token');
            }
        } catch (error) {
            console.error('Error validating token:', error);
            setError('Error validating token');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBidSubmit = async () => {
        if (!isTokenValid) {
            setError('Please enter a valid bidding token first');
            return;
        }

        if (!selectedPercentage) {
            setError('Please select a bid percentage');
            return;
        }

        const bidAmount = calculateBidAmount(selectedPercentage);

        try {
            const response = await axios.post('http://localhost:5000/place-bid', {
                itemId,
                token: biddingToken,
                email: userEmail,
                bidAmount: bidAmount
            });
            if (response.data.success) {
                Swal.fire({
                    toast: true,
                    position: 'top',
                    text: 'Bid placed successfully!',
                    showConfirmButton: false,
                    timer: 2000,
                    background: 'black',
                    color: 'white',
                    customClass: {
                        popup: 'swal-toast',
                        title: 'swal-toast-title'
                    }
                });
                setBiddingToken('');
                setSelectedPercentage('');
                setIsTokenValid(false);
                setError('');
                onBidPlaced(bidAmount);
            } else {
                setError(response.data.message || 'Failed to place bid');
            }
        } catch (error) {
            console.error('Error placing bid:', error);
            setError('Error placing bid');
        }
    };

    return (
        <div className="flex items-center justify-start">
            <div className="w-[550px] flex flex-col justify-center">
                <h3 className="text-xl font-thin mt-2">Place a Bid</h3>
                <p className='font-thin mb-5'>Please enter your bidding token for this item to verify it. Once verified, you can proceed to increase your bid by your selected percentage</p>
                <div className="mb-4">
                    <div className="flex">
                        <input
                            type="text"
                            value={biddingToken}
                            onChange={(e) => setBiddingToken(e.target.value)}
                            className="font-normal mt-1 block w-full px-3 py-4 bg-[#603601] text-white rounded-md shadow-sm focus:outline-none outline-none"
                            placeholder="Bidding Token"
                        />
                        <button
                            onClick={handleTokenValidation}
                            className={`font-normal ml-2 flex items-center justify-center py-4 px-6 rounded-md focus:outline-none focus:ring-2 ${isTokenValid ? 'bg-[#1C0A00] text-white' : 'bg-[#1C0A00] text-white hover:bg-black hover:scale-110 transition-transform duration-500'} ${isLoading || !biddingToken ? 'cursor-not-allowed' : ''}`}
                            disabled={isLoading || !biddingToken}
                            style={{ width: '120px' }}
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin" />
                            ) : isTokenValid ? (
                                <IoCheckmarkDoneSharp className="text-green-500" />
                            ) : error ? (
                                <FcCancel />
                            ) : (
                                'Verify'
                            )}
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <select
                        value={selectedPercentage}
                        onChange={(e) => setSelectedPercentage(e.target.value)}
                        className="mt-1 block w-full px-3 py-4 text-white rounded-md shadow-sm focus:outline-none bg-[#603601]"
                        disabled={!isTokenValid}
                    >
                        <option value="">Select percentage</option>
                        {percentageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label} (+{calculateBidAmount(option.value).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleBidSubmit}
                    disabled={!isTokenValid || !selectedPercentage}
                    className="w-full bg-[#1C0A00] text-white py-4 px-4 rounded-md hover:bg-black hover:scale-110 transition-transform duration-500 cursor-pointer"
                >
                    Place Bid
                </button>
            </div>
        </div>
    );
};

export default BiddingForm;
