// 'use client';
// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import BidderHeader from "@/components/Bidder Components/Bidder Header/page";
// import { Footer } from "@/components/Bidder Components/Bidder Footer/page";
// import Banner from '@/components/Bidder Components/Auction Details Page/Banner/page';
// import Instruction from '@/components/Bidder Components/Auction Details Page/Instruction Components/page';
// import { loadStripe, Stripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import BiddingForm from '@/components/Bidder Components/Auction Details Page/Bid Place Components/page';
// import Chatbot from '@/components/Bidder Components/Auction Details Page/Chat Components/page';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import BiddingPaymentForm from '@/components/Bidder Components/Auction Details Page/Token Payment Form/page';
// import PaymentForm from '@/components/Bidder Components/Auction Details Page/Payment Form/page';
// import { GiTakeMyMoney } from "react-icons/gi";
// import Image from 'next/image';

// // Define types for your data structures
// interface Item {
//     _id: string;
//     title: string;
//     category: string;
//     description: string;
//     basePrice: number;
//     currentPrice: number;
//     bidEndTime: string;
//     currentStatus: 'bidding' | 'closed';
//     primaryImage: string;
//     secondaryImages?: string[];
//     bidders: Bidder[];
//     transaction?: {
//         status: string;
//     };
//     [key: string]: any; // For dynamic fields based on category
// }

// interface Bidder {
//     userId: string;
//     name: string;
//     email: string;
//     bidAmount: number;
// }

// interface PaymentStep {
//     clientSecret: string;
//     amount: number;
// }

// interface PaymentHistory {
//     amount: number;
//     paidAt: string;
// }

// const stripePromise = loadStripe("pk_test_51OT0m1SBqQNmRFp2b1HOsHjUjMB7f2ht4EnZ5saT9hXCq5xjH61VvvMm49AH34T5aLELQ8FuavwoUzP57ClDkv6l00VlNLXNGv");

// const ItemDetails: React.FC = () => {
//     const [item, setItem] = useState<Item | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [currentPrice, setCurrentPrice] = useState<number>(0);
//     const { itemId } = useParams();
//     const [timeLeft, setTimeLeft] = useState<string | null>(null);
//     const [email, setEmail] = useState<string>('');
//     const [clientSecret, setClientSecret] = useState<string>('');
//     const [tokenAmount, setTokenAmount] = useState<number>(0);
//     const [biddingToken, setBiddingToken] = useState<string>('');
//     const [winningBidder, setWinningBidder] = useState<Bidder | null>(null);
//     const [userEmail, setUserEmail] = useState<string>('');
//     const [isWinner, setIsWinner] = useState<boolean>(false);
//     const [paymentSteps, setPaymentSteps] = useState<PaymentStep[]>([]);
//     const [currentPaymentStep, setCurrentPaymentStep] = useState<number>(0);
//     const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
//     const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
//     const [canProceed, setCanProceed] = useState<boolean>(false);
//     const router = useRouter();

//     const userData = useSelector((state: RootState) => state.user);

//     useEffect(() => {
//         const fetchItemDetails = async () => {
//             try {
//                 const response = await fetch(`https://auctregal.rudopedia.shop/items/${itemId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch item details');
//                 }
//                 const data: Item = await response.json();
//                 setItem(data);
//                 if (data.currentStatus === 'bidding') {
//                     calculateTimeLeft(data.bidEndTime);
//                     setCurrentPrice(data.currentPrice);
//                 } else if (data.currentStatus === 'closed') {
//                     const winner = data.bidders.reduce((prev, current) =>
//                         (prev.bidAmount > current.bidAmount) ? prev : current
//                     );
//                     setWinningBidder(winner);
//                     if (userData.email === winner.email) {
//                         setIsWinner(true);
//                         if (data.transaction && data.transaction.status === 'completed') {
//                             setPaymentCompleted(true);
//                         }
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching item details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (itemId) {
//             fetchItemDetails();
//         }
//     }, [itemId, userData.email]);

//     useEffect(() => {
//         if (!item || item.currentStatus !== 'bidding') return;

//         const interval = setInterval(() => {
//             calculateTimeLeft(item.bidEndTime);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [item]);

//     useEffect(() => {
//         if (paymentCompleted && isWinner) {
//             setCanProceed(true);
//         }
//     }, [paymentCompleted, isWinner]);

//     const handleProceedToNext = () => {
//         if (canProceed && item) {
//             router.push(`/checkout?itemId=${item._id}&userId=${winningBidder?.userId}`);
//         }
//     };

//     const handleVerification = async () => {
//         if (!item) return;

//         try {
//             const response = await axios.post('https://auctregal.rudopedia.shop/verify-winner', {
//                 email: userEmail,
//                 token: biddingToken,
//                 itemId: item._id
//             });
//             if (response.data.verified) {
//                 setIsWinner(true);
//             } else {
//                 alert('Verification failed. Please check your email and token.');
//             }
//         } catch (error) {
//             console.error('Error verifying winner:', error);
//             alert('Error verifying winner. Please try again.');
//         }
//     };

//     const handlePayment = async () => {
//         if (!item) return;

//         try {
//             const response = await axios.post('https://auctregal.rudopedia.shop/complete-auction-payment', {
//                 itemId: item._id,
//                 email: userData.email
//             });
//             setPaymentSteps(response.data.paymentSteps);
//             setCurrentPaymentStep(0);
//             setClientSecret(response.data.paymentSteps[0].clientSecret);
//         } catch (error) {
//             console.error('Error initiating payment:', error);
//             alert('Error initiating payment. Please try again.');
//         }
//     };

//     const handlePaymentSuccess = async (paymentIntentId: string) => {
//         if (!item) return;

//         try {
//             const response = await axios.post('https://auctregal.rudopedia.shop/confirm-auction-payment', {
//                 paymentIntentId,
//                 itemId: item._id,
//                 email: userData.email
//             });

//             if (response.data.nextStep) {
//                 setCurrentPaymentStep(currentPaymentStep + 1);
//                 setClientSecret(response.data.nextStep.clientSecret);
//                 setPaymentHistory(response.data.paymentHistory);
//                 alert(`Payment step ${currentPaymentStep + 1} successful. Please proceed with the next payment.`);
//             }

//             if (response.data.paymentCompleted) {
//                 setPaymentCompleted(true);
//             }
//         } catch (error) {
//             console.error('Error confirming payment:', error);
//             alert('Error confirming payment. Please contact support.');
//         }
//     };

//     const handleBidPlaced = (newBidAmount: number) => {
//         setCurrentPrice(newBidAmount);
//     };

//     const calculateTimeLeft = (endTime: string) => {
//         const end = new Date(endTime).getTime();
//         const now = new Date().getTime();
//         const distance = end - now;

//         if (distance < 0) {
//             setTimeLeft("EXPIRED");
//             return;
//         }

//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     };

//     const formatPrice = (price: number) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             currencyDisplay: 'symbol',
//         }).format(price);
//     };

//     const handleGenerateToken = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!item) return;

//         try {
//             const response = await axios.post('https://auctregal.rudopedia.shop/generate-bidding-token', {
//                 email,
//                 itemId: item._id
//             });
//             setClientSecret(response.data.clientSecret);
//             setTokenAmount(response.data.amount);
//         } catch (error) {
//             console.error('Error generating token:', error);
//             alert((error as any).response?.data?.message || 'Error generating token');
//         }
//     };

//     const handleBiddingPaymentSuccess = (token: string) => {
//         setBiddingToken(token);
//         alert('Bidding token generated successfully!');
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!item) {
//         return <div>Item not found</div>;
//     }


//     const renderFields = () => {
//         const fields = categoryFields[item.category] || [];
//         return fields.map((field) => {
//             const camelCaseField = field.charAt(0).toLowerCase() + field.slice(1).replace(/\s+/g, '');
//             return (
//                 <div key={field} className="mb-1">
//                     {field} - {item[camelCaseField]}
//                 </div>
//             );
//         });
//     };

//     const renderDescription = () => {
//         const fields = categoryFields[item.category] || [];
//         let description = '';

//         switch (item.category) {
//             case 'Art and Antiques':
//                 description = `This is a piece titled "${item.title}" by ${item.artist}, created in ${item.year}. It is a ${item.medium} with dimensions ${item.dimensions}, in ${item.condition} condition, and comes with a provenance of ${item.provenance}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//             case 'Jewelry and Watches':
//                 description = `This is a ${item.brand} ${item.title} made of ${item.material}, featuring ${item.gemstone} with a carat weight of ${item.caratWeight}. It is in ${item.condition} condition and comes with certification: ${item.certification}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//             case 'Vehicles':
//                 description = `This vehicle is a ${item.year} ${item.make} ${item.model} with ${item.mileage} mileage. It has a VIN of ${item.vin}, is in ${item.condition} condition, and is colored ${item.color}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//             case 'Wine and Spirits':
//                 description = `This is a ${item.name}, a ${item.type} from the ${item.vintage} vintage. It is from the ${item.region} region, with an ABV of ${item.abv}, and comes in a ${item.bottleSize} bottle. It is in ${item.condition} condition. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//             case 'Rare Books and Manuscripts':
//                 description = `This is a rare book titled "${item.title}" by ${item.author}, published in ${item.year}. It is a ${item.edition} edition, in ${item.condition} condition, published by ${item.publisher}, and in ${item.language}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//             case 'Collectables':
//                 description = `This is a ${item.title}, a ${item.type} from the ${item.era} era. It is in ${item.condition} condition and is considered ${item.rarity}. It was manufactured by ${item.manufacturer}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//             default:
//                 description = `This is an item in the ${item.category} category. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
//                 break;
//         }

//         return <div className="mb-4">{description}</div>;
//     };



//     const renderClosedBidding = () => {
//         const topThreeBidders = item.bidders
//             ? [...item.bidders].sort((a, b) => b.bidAmount - a.bidAmount).slice(0, 3)
//             : [];

//         return (
//             <div className="p-10 bg-[#361500]">
//                 <h1 className="text-center text-5xl text-[#EDE4E0] font-thin mb-6">
//                     Bidding Closed for {item.title}
//                 </h1>
//                 <p className="text-center text-sm text-[#EDE4E0] pr-16 pl-16 mb-4 font-thin">
//                     {item.description}
//                 </p>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 items-center">
//                     <div>
//                         <div className="relative w-full h-[250px]"> {/* Container for the image */}
//                             <Image
//                                 src={item.primaryImage}
//                                 alt={item.title}
//                                 layout="fill" // Makes the image fill the container
//                                 objectFit="cover" // Ensures the image covers the container with proper aspect ratio
//                                 className="rounded-lg shadow-lg"
//                                 priority={true} // Prioritize the image for fast loading
//                             />
//                         </div>
//                     </div>
//                     <div className="text-left lg:text-left text-[#EDE4E0] pr-5 lg:pr-16 pl-5 lg:pl-16 font-light">
//                         <p className="mb-2">
//                             The item <span className="font-semibold">{item.title}</span> categorized under <span className="font-semibold">{item.category}</span>, opened for bidding at a base price of ₹{item.basePrice.toLocaleString('en-IN')}.
//                             {winningBidder ? (
//                                 <>
//                                     It was successfully sold for ₹{winningBidder.bidAmount.toLocaleString('en-IN')} to the highest bidder, <span className="font-semibold">{winningBidder.name}</span>. Congratulations to <span className="font-semibold">{winningBidder.name}</span> for winning the item on the Auctregal platform!
//                                 </>
//                             ) : (
//                                 <>
//                                     The auction has closed, but information about the winning bidder is not available.
//                                 </>
//                             )}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 p-8 bg-[#1C0A00] rounded-lg shadow-lg">
//                     <div className="flex flex-col justify-center font-thin">
//                         <p className="text-3xl text-[#EDE4E0] mb-4 font-thin">Detailed Item Information</p>
//                         {renderFields()}
//                     </div>
//                     <div className="flex flex-col justify-center font-thin">
//                         <p className="text-3xl text-[#EDE4E0] mb-4 font-thin">Auction Information</p>
//                         <p className="text-[#EDE4E0] mb-2">Final Price: ₹{item.currentPrice?.toLocaleString('en-IN') || 'N/A'}</p>
//                         <p className="text-[#EDE4E0] mb-2">Total Bids: {item.bidders?.length || 'N/A'}</p>
//                         <p className="text-[#EDE4E0] mb-2">Auction End Date: {new Date(item.bidEndTime).toLocaleDateString()}</p>
//                         <p className="text-lg text-[#EDE4E0] mt-6">Top 3 Bidders</p>
//                         {topThreeBidders.length > 0 ? (
//                             <table className="w-full mt-4 border-collapse">
//                                 <thead>
//                                     <tr className="text-left border-b border-[#DCD7C9]">
//                                         <th className="px-4 py-2 text-[#DCD7C9] font-thin">Rank</th>
//                                         <th className="px-4 py-2 text-[#DCD7C9] font-thin">Name</th>
//                                         <th className="px-4 py-2 text-[#DCD7C9] font-thin">Bid Amount</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {topThreeBidders.map((bidder, index) => (
//                                         <tr key={bidder.userId} className="border-b last:border-none border-[#DCD7C9]">
//                                             <td className="px-4 py-2 text-[#DCD7C9] font-thin">{index + 1}</td>
//                                             <td className="px-4 py-2 text-[#DCD7C9] font-thin">{bidder.name}</td>
//                                             <td className="px-4 py-2 text-[#DCD7C9] font-thin">₹{bidder.bidAmount.toLocaleString('en-IN')}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         ) : (
//                             <p className="text-lg text-[#DCD7C9]">No bidders</p>
//                         )}
//                     </div>
//                 </div>

//                 {isWinner && renderPaymentSection()}

//                 {!isWinner && userData.email === winningBidder?.email && (
//                     <div className="mt-10">
//                         <h2 className="text-2xl font-semibold mb-3">Verify Your Win</h2>
//                         <div className="flex flex-col lg:flex-row gap-4 items-center">
//                             <input
//                                 type="email"
//                                 value={userEmail}
//                                 onChange={(e) => setUserEmail(e.target.value)}
//                                 placeholder="Enter your email"
//                                 className="px-3 py-2 border rounded text-black lg:w-1/3"
//                             />
//                             <input
//                                 type="text"
//                                 value={biddingToken}
//                                 onChange={(e) => setBiddingToken(e.target.value)}
//                                 placeholder="Enter your bidding token"
//                                 className="px-3 py-2 border rounded text-black lg:w-1/3"
//                             />
//                             <button
//                                 onClick={handleVerification}
//                                 className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
//                             >
//                                 Verify
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     };



//     const renderPaymentSection = () => (
//         <div className="mt-6">

//             {paymentCompleted ? (
//                 <>
//                     <p className='text-center text-[#DCD7C9] text-3xl font-thin'>Transaction Completed</p>
//                     <p className='text-center text-[#DCD7C9] font-thin'>Please tap the button below to activate your slip code.</p>
//                     {isWinner && (
//                         <div className="flex justify-center">
//                             <button
//                                 onClick={handleProceedToNext}
//                                 className="mt-5 bg-[#DCD7C9] text-[#2C3639] py-2 px-8 rounded-full hover:bg-[#2C3639] hover:text-[#DCD7C9] focus:outline-none transition-colors duration-500"
//                             >
//                                 Proceed to Next
//                             </button>
//                         </div>

//                     )}
//                 </>
//             ) : paymentSteps.length === 0 ? (

//                 <div className="flex flex-col justify-center items-center h-full mt-5 gap-5">
//                     <div>
//                         <h2 className="text-lg text-center text-[#2C3639]">Complete Your Purchase</h2>
//                         <p className='text-center pr-20 pl-20 text-[#2C3639]'>Please initiate the payment and complete the required steps to proceed to the next stage. Upon completion, you will receive a slip code and QR code to collect your item from the Auctregal headquarters.</p>
//                     </div>
//                     <button
//                         onClick={handlePayment}
//                         className="bg-[#2C3639] text-[#DCD7C9] py-2 px-8 rounded-full hover:bg-[#DCD7C9] hover:text-[#2C3639] focus:outline-none transition-colors duration-500"
//                     >
//                         Initiate Payment
//                     </button>
//                 </div>

//             ) : (
//                 <>
//                     <div>
//                         <h2 className="text-lg text-center text-[#2C3639]">Complete Your Purchase</h2>
//                         <p className='text-center pr-20 pl-20 text-[#2C3639]'>Please initiate the payment and complete the required steps to proceed to the next stage. Upon completion, you will receive a slip code and QR code to collect your item from the Auctregal headquarters.</p>
//                     </div>
//                     <p className='text-center pt-8 text-[#2C3639] text-lg'>Payment Step - {currentPaymentStep + 1} of {paymentSteps.length}</p>
//                     <p className='text-center text-[#2C3639] pb-6'>Amount - {formatPrice(paymentSteps[currentPaymentStep].amount)}</p>
//                     <Elements stripe={stripePromise}>
//                         <PaymentForm
//                             clientSecret={clientSecret}
//                             email={userData.email}
//                             onPaymentSuccess={handlePaymentSuccess}
//                         />
//                     </Elements>
//                 </>
//             )}
//         </div>
//     );

//     const renderCurrentBidding = () => (
//         <>
//             <div className="flex flex-row justify-between pr-20 pl-20 pt-10">
//                 <div className="font-thin">
//                     <p>Remaining time for bidding on the item</p>
//                     <p className="text-lg mt-2"><span className="text-4xl text-red-500 font-thin">{timeLeft}</span></p>
//                 </div>
//                 <div>
//                     <p className="mt-2 font-thin">Current bid amount for the item</p>
//                     <p className="text-4xl font-black flex items-center">
//                         {formatPrice(currentPrice)}
//                         <GiTakeMyMoney className="ml-2 text-4xl" />
//                     </p>
//                 </div>
//             </div>

//             <div className="flex flex-col items-center pt-8">
//                 <p className="text-7xl font-thin tracking-tighter">{item.category === 'Vehicles' ? item.make + " " + item.model : (item.category === 'Wine and Spirits' ? item.name : item.title)}</p>
//                 <p className="pl-32 pr-32 text-center font-thin mt-1">{item.description}</p>
//                 <p className='font-thin'>{item.category}</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pl-20 pr-20">
//                 <div>
//                     <Image
//                         src={item.primaryImage}
//                         alt={item.title}
//                         width={630}
//                         height={450}
//                         className="rounded-lg shadow-lg"
//                         objectFit="cover"
//                         priority={true}
//                     />
//                     <div className="flex gap-20 mt-6">
//                         {item.secondaryImages?.map((image, index) => (
//                             <Image
//                                 key={index}
//                                 src={image}
//                                 alt={`Secondary ${index}`}
//                                 width={150}
//                                 height={100}
//                                 className="object-cover cursor-pointer mr-2 mb-2 rounded-lg"
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 <div className="flex flex-col items-start">
//                     <h2 className="text-2xl font-thin mb-2">Item Overview</h2>

//                     <div className="w-full text-left font-thin">
//                         {renderDescription()}
//                     </div>
//                     <div>
//                         <BiddingForm
//                             itemId={item._id}
//                             basePrice={item.basePrice}
//                             currentPrice={currentPrice}
//                             onBidPlaced={handleBidPlaced}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <Instruction />

//             <div className="mt-10 px-10">
//                 <h3 className="text-xl text-center mb-4 text-[#DCD7C9] font-thin">Top 3 Recent Bidders</h3>
//                 <div className="overflow-x-auto">
//                     <table className="w-3/6 mx-auto border-collapse">
//                         <thead>
//                             <tr className="text-left border-b border-gray-200">
//                                 <th className="px-4 py-2 text-[#DCD7C9] font-thin">Rank</th>
//                                 <th className="px-4 py-2 text-[#DCD7C9] font-thin">Name</th>
//                                 <th className="px-4 py-2 text-[#DCD7C9] font-thin">Bid Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {item.bidders
//                                 .sort((a, b) => b.bidAmount - a.bidAmount)
//                                 .slice(0, 3)
//                                 .map((bidder, index) => (
//                                     <tr key={bidder.userId} className="border-b last:border-none border-gray-200">
//                                         <td className="px-4 py-2 text-[#DCD7C9] font-thin">{index + 1}</td>
//                                         <td className="px-4 py-2 text-[#DCD7C9] font-thin">{bidder.name}</td>
//                                         <td className="px-4 py-2 text-[#DCD7C9] font-thin">{formatPrice(bidder.bidAmount)}</td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>



//             <div className="mt-10 px-20 flex flex-col items-center">
//                 <h3 className="text-4xl font-thin">Generate Bidding Key</h3>
//                 <p className='font-thin mb-5'>Please provide your email to continue with the payment process</p>
//                 {!biddingToken ? (
//                     <>
//                         <form onSubmit={handleGenerateToken} className="mb-4">
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 placeholder="Enter your email"
//                                 required
//                                 className="px-3 py-2 border rounded mr-2 text-black"
//                             />
//                             <button type="submit" className="bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-950 focus:outline-none transition-colors duration-500">
//                                 Generate
//                             </button>
//                         </form>

//                         {clientSecret && (
//                             <div>
//                                 <h4 className="text-xl font-semibold mb-2 w-[670px] text-center">Make Payment</h4>
//                                 <p className="text-lg mb-2 text-center">Amount: {formatPrice(tokenAmount)}</p>
//                                 <Elements stripe={stripePromise}>
//                                     <BiddingPaymentForm
//                                         clientSecret={clientSecret}
//                                         email={email}
//                                         onPaymentBiddingSuccess={handleBiddingPaymentSuccess}
//                                     />
//                                 </Elements>
//                             </div>
//                         )}
//                     </>
//                 ) : (
//                     <p className="text-green-500">Bidding Token: {biddingToken}</p>
//                 )}
//             </div>

//             <Chatbot item={item} />
//         </>
//     );

//     return (
//         <div className="flex flex-col min-h-screen">
//             <BidderHeader />
//             <Banner />
//             <main>
//                 {item.currentStatus === 'closed' ? renderClosedBidding() : renderCurrentBidding()}
//                 {paymentHistory.length > 0 && (
//                     <div className="mt-6">
//                         <h3 className="text-xl font-semibold mb-2">Payment History</h3>
//                         <ul>
//                             {paymentHistory.map((payment, index) => (
//                                 <li key={index}>
//                                     Amount: {formatPrice(payment.amount)} -
//                                     Date: {new Date(payment.paidAt).toLocaleString()}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default ItemDetails;

// const categoryFields: { [key: string]: string[] } = {
//     'Art and Antiques': ['Title', 'Artist', 'Year', 'Medium', 'Dimensions', 'Condition', 'Provenance'],
//     'Jewelry and Watches': ['Title', 'Brand', 'Brand', 'Material', 'Gemstone', 'Carat Weight', 'Condition', 'Certification'],
//     'Vehicles': ['Make', 'Model', 'Year', 'Mileage', 'VIN', 'Condition', 'Color'],
//     'Wine and Spirits': ['Name', 'Type', 'Vintage', 'Region', 'ABV', 'Bottle Size', 'Condition'],
//     'Rare Books and Manuscripts': ['Title', 'Author', 'Year', 'Condition', 'Edition', 'Publisher', 'Language'],
//     'Collectables': ['Title', 'Type', 'Era', 'Condition', 'Rarity', 'Manufacturer'],
// };












'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BidderHeader from "@/components/Bidder Components/Bidder Header/page";
import { Footer } from "@/components/Bidder Components/Bidder Footer/page";
import Banner from '@/components/Bidder Components/Auction Details Page/Banner/page';
import Instruction from '@/components/Bidder Components/Auction Details Page/Instruction Components/page';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import BiddingForm from '@/components/Bidder Components/Auction Details Page/Bid Place Components/page';
import Chatbot from '@/components/Bidder Components/Auction Details Page/Chat Components/page';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import BiddingPaymentForm from '@/components/Bidder Components/Auction Details Page/Token Payment Form/page';
import PaymentForm from '@/components/Bidder Components/Auction Details Page/Payment Form/page';
import { GiTakeMyMoney } from "react-icons/gi";
import Image from 'next/image';
import Swal from 'sweetalert2';

// Define types for your data structures
interface Item {
    _id: string;
    title: string;
    category: string;
    description: string;
    basePrice: number;
    currentPrice: number;
    bidEndTime: string;
    currentStatus: 'bidding' | 'closed';
    primaryImage: string;
    secondaryImages?: string[];
    bidders: Bidder[];
    transaction?: {
        status: string;
    };
    [key: string]: any;
}

interface Bidder {
    userId: string;
    name: string;
    email: string;
    bidAmount: number;
}

interface PaymentStep {
    clientSecret: string;
    amount: number;
}

interface PaymentHistory {
    amount: number;
    paidAt: string;
}

const stripePromise = loadStripe("pk_test_51OT0m1SBqQNmRFp2b1HOsHjUjMB7f2ht4EnZ5saT9hXCq5xjH61VvvMm49AH34T5aLELQ8FuavwoUzP57ClDkv6l00VlNLXNGv");

const ItemDetails: React.FC = () => {
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const { itemId } = useParams();
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>('');
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [biddingToken, setBiddingToken] = useState<string>('');
    const [winningBidder, setWinningBidder] = useState<Bidder | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [isWinner, setIsWinner] = useState<boolean>(false);
    const [paymentSteps, setPaymentSteps] = useState<PaymentStep[]>([]);
    const [currentPaymentStep, setCurrentPaymentStep] = useState<number>(0);
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
    const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
    const [canProceed, setCanProceed] = useState<boolean>(false);
    const router = useRouter();

    const userData = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`https://auctregal.rudopedia.shop/items/${itemId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item details');
                }
                const data: Item = await response.json();
                setItem(data);
                if (data.currentStatus === 'bidding') {
                    calculateTimeLeft(data.bidEndTime);
                    setCurrentPrice(data.currentPrice);
                } else if (data.currentStatus === 'closed') {
                    const winner = data.bidders.reduce((prev, current) =>
                        (prev.bidAmount > current.bidAmount) ? prev : current
                    );
                    setWinningBidder(winner);
                    if (userData.email === winner.email) {
                        setIsWinner(true);
                        if (data.transaction && data.transaction.status === 'completed') {
                            setPaymentCompleted(true);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (itemId) {
            fetchItemDetails();
        }
    }, [itemId, userData.email]);

    useEffect(() => {
        if (!item || item.currentStatus !== 'bidding') return;

        const interval = setInterval(() => {
            calculateTimeLeft(item.bidEndTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [item]);

    useEffect(() => {
        if (paymentCompleted && isWinner) {
            setCanProceed(true);
        }
    }, [paymentCompleted, isWinner]);

    const handleProceedToNext = () => {
        if (canProceed && item) {
            router.push(`/checkout?itemId=${item._id}&userId=${winningBidder?.userId}`);
        }
    };

    const handleVerification = async () => {
        if (!item) return;

        try {
            const response = await axios.post('https://auctregal.rudopedia.shop/verify-winner', {
                email: userEmail,
                token: biddingToken,
                itemId: item._id
            });
            if (response.data.verified) {
                setIsWinner(true);
            } else {
                // alert('Verification failed. Please check your email and token.');

                Swal.fire({
                    toast: true,
                    position: 'top',
                    text: 'Verification failed. Please check your email and token.',
                    showConfirmButton: false,
                    timer: 2000,
                    background: 'black',
                    color: 'white',
                    customClass: {
                        popup: 'swal-toast',
                        title: 'swal-toast-title'
                    }
                });
            }
        } catch (error) {
            console.error('Error verifying winner:', error);
            alert('Error verifying winner. Please try again.');
        }
    };

    const handlePayment = async () => {
        if (!item) return;

        try {
            const response = await axios.post('https://auctregal.rudopedia.shop/complete-auction-payment', {
                itemId: item._id,
                email: userData.email
            });
            setPaymentSteps(response.data.paymentSteps);
            setCurrentPaymentStep(0);
            setClientSecret(response.data.paymentSteps[0].clientSecret);
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('Error initiating payment. Please try again.');
        }
    };

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        if (!item) return;

        try {
            const response = await axios.post('https://auctregal.rudopedia.shop/confirm-auction-payment', {
                paymentIntentId,
                itemId: item._id,
                email: userData.email
            });

            if (response.data.nextStep) {
                setCurrentPaymentStep(currentPaymentStep + 1);
                setClientSecret(response.data.nextStep.clientSecret);
                setPaymentHistory(response.data.paymentHistory);
                // alert(`Payment step ${currentPaymentStep + 1} successful. Please proceed with the next payment.`);
                Swal.fire({
                    toast: true,
                    position: 'top',
                    text: `Payment step ${currentPaymentStep + 1} successful. Please proceed with the next payment.`,
                    showConfirmButton: false,
                    timer: 2000,
                    background: 'black',
                    color: 'white',
                    customClass: {
                        popup: 'swal-toast',
                        title: 'swal-toast-title'
                    }
                });
            }

            if (response.data.paymentCompleted) {
                setPaymentCompleted(true);
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            alert('Error confirming payment. Please contact support.');
        }
    };

    const handleBidPlaced = (newBidAmount: number) => {
        setCurrentPrice(newBidAmount);
    };

    const calculateTimeLeft = (endTime: string) => {
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();
        const distance = end - now;

        if (distance < 0) {
            setTimeLeft("EXPIRED");
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            currencyDisplay: 'symbol',
        }).format(price);
    };

    const handleGenerateToken = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!item) return;

        try {
            const response = await axios.post('https://auctregal.rudopedia.shop/generate-bidding-token', {
                email,
                itemId: item._id
            });
            setClientSecret(response.data.clientSecret);
            setTokenAmount(response.data.amount);
        } catch (error) {
            console.error('Error generating token:', error);
            alert((error as any).response?.data?.message || 'Error generating token');
        }
    };

    const handleBiddingPaymentSuccess = (token: string) => {
        setBiddingToken(token);
        // alert('Bidding token generated successfully!');
        Swal.fire({
            toast: true,
            position: 'top',
            text: 'Bidding token generated successfully!',
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black"></div>
            </div>
        );
    }

    if (!item) {
        return <div>Item not found</div>;
    }


    const renderFields = () => {
        const fields = categoryFields[item.category] || [];
        return fields.map((field) => {
            const camelCaseField = field.charAt(0).toLowerCase() + field.slice(1).replace(/\s+/g, '');
            return (
                <div key={field} className="mb-1">
                    {field} - {item[camelCaseField]}
                </div>
            );
        });
    };

    const renderDescription = () => {
        const fields = categoryFields[item.category] || [];
        let description = '';

        switch (item.category) {
            case 'Art and Antiques':
                description = `This is a piece titled "${item.title}" by ${item.artist}, created in ${item.year}. It is a ${item.medium} with dimensions ${item.dimensions}, in ${item.condition} condition, and comes with a provenance of ${item.provenance}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
            case 'Jewelry and Watches':
                description = `This is a ${item.brand} ${item.title} made of ${item.material}, featuring ${item.gemstone} with a carat weight of ${item.caratWeight}. It is in ${item.condition} condition and comes with certification: ${item.certification}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
            case 'Vehicles':
                description = `This vehicle is a ${item.year} ${item.make} ${item.model} with ${item.mileage} mileage. It has a VIN of ${item.vin}, is in ${item.condition} condition, and is colored ${item.color}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
            case 'Wine and Spirits':
                description = `This is a ${item.name}, a ${item.type} from the ${item.vintage} vintage. It is from the ${item.region} region, with an ABV of ${item.abv}, and comes in a ${item.bottleSize} bottle. It is in ${item.condition} condition. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
            case 'Rare Books and Manuscripts':
                description = `This is a rare book titled "${item.title}" by ${item.author}, published in ${item.year}. It is a ${item.edition} edition, in ${item.condition} condition, published by ${item.publisher}, and in ${item.language}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
            case 'Collectables':
                description = `This is a ${item.title}, a ${item.type} from the ${item.era} era. It is in ${item.condition} condition and is considered ${item.rarity}. It was manufactured by ${item.manufacturer}. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
            default:
                description = `This is an item in the ${item.category} category. Bidding started at ${formatPrice(item.basePrice)} and is currently at ${formatPrice(item.currentPrice)}.`;
                break;
        }

        return <div className="mb-4">{description}</div>;
    };



    const renderClosedBidding = () => {
        const topThreeBidders = item.bidders
            ? [...item.bidders].sort((a, b) => b.bidAmount - a.bidAmount).slice(0, 3)
            : [];

        return (
            <div className="p-10 bg-[#361500]">
                <h1 className="text-center text-5xl text-[#EDE4E0] font-thin mb-6">
                    Bidding Closed for {item.title}
                </h1>
                <p className="text-center text-sm text-[#EDE4E0] pr-16 pl-16 mb-4 font-thin">
                    {item.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 items-center">
                    <div>
                        <div className="relative w-full h-[250px]"> {/* Container for the image */}
                            <Image
                                src={item.primaryImage}
                                alt={item.title}
                                layout="fill" // Makes the image fill the container
                                objectFit="cover" // Ensures the image covers the container with proper aspect ratio
                                className="rounded-lg shadow-lg"
                                priority={true} // Prioritize the image for fast loading
                            />
                        </div>
                    </div>
                    <div className="text-left lg:text-left text-[#EDE4E0] pr-5 lg:pr-16 pl-5 lg:pl-16 font-light">
                        <p className="mb-2">
                            The item <span className="font-semibold">{item.title}</span> categorized under <span className="font-semibold">{item.category}</span>, opened for bidding at a base price of ₹{item.basePrice.toLocaleString('en-IN')}.
                            {winningBidder ? (
                                <>
                                    It was successfully sold for ₹{winningBidder.bidAmount.toLocaleString('en-IN')} to the highest bidder, <span className="font-semibold">{winningBidder.name}</span>. Congratulations to <span className="font-semibold">{winningBidder.name}</span> for winning the item on the Auctregal platform!
                                </>
                            ) : (
                                <>
                                    The auction has closed, but information about the winning bidder is not available.
                                </>
                            )}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 p-8 bg-[#1C0A00] rounded-lg shadow-lg">
                    <div className="flex flex-col justify-center font-thin">
                        <p className="text-3xl text-[#EDE4E0] mb-4 font-thin">Detailed Item Information</p>
                        {renderFields()}
                    </div>
                    <div className="flex flex-col justify-center font-thin">
                        <p className="text-3xl text-[#EDE4E0] mb-4 font-thin">Auction Information</p>
                        <p className="text-[#EDE4E0] mb-2">Final Price: ₹{item.currentPrice?.toLocaleString('en-IN') || 'N/A'}</p>
                        <p className="text-[#EDE4E0] mb-2">Total Bids: {item.bidders?.length || 'N/A'}</p>
                        <p className="text-[#EDE4E0] mb-2">Auction End Date: {new Date(item.bidEndTime).toLocaleDateString()}</p>
                        <p className="text-lg text-[#EDE4E0] mt-6">Top 3 Bidders</p>
                        {topThreeBidders.length > 0 ? (
                            <table className="w-full mt-4 border-collapse">
                                <thead>
                                    <tr className="text-left border-b border-[#DCD7C9]">
                                        <th className="px-4 py-2 text-[#DCD7C9] font-thin">Rank</th>
                                        <th className="px-4 py-2 text-[#DCD7C9] font-thin">Name</th>
                                        <th className="px-4 py-2 text-[#DCD7C9] font-thin">Bid Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topThreeBidders.map((bidder, index) => (
                                        <tr key={bidder.userId} className="border-b last:border-none border-[#DCD7C9]">
                                            <td className="px-4 py-2 text-[#DCD7C9] font-thin">{index + 1}</td>
                                            <td className="px-4 py-2 text-[#DCD7C9] font-thin">{bidder.name}</td>
                                            <td className="px-4 py-2 text-[#DCD7C9] font-thin">₹{bidder.bidAmount.toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-lg text-[#DCD7C9]">No bidders</p>
                        )}
                    </div>
                </div>

                {isWinner && renderPaymentSection()}

                {!isWinner && userData.email === winningBidder?.email && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-3">Verify Your Win</h2>
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-3 py-2 border rounded text-black lg:w-1/3"
                            />
                            <input
                                type="text"
                                value={biddingToken}
                                onChange={(e) => setBiddingToken(e.target.value)}
                                placeholder="Enter your bidding token"
                                className="px-3 py-2 border rounded text-black lg:w-1/3"
                            />
                            <button
                                onClick={handleVerification}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };



    const renderPaymentSection = () => (
        <div className="mt-6">

            {paymentCompleted ? (
                <>
                    <p className='text-center text-[#DCD7C9] text-3xl font-thin'>Transaction Completed</p>
                    <p className='text-center text-[#DCD7C9] font-thin'>Please tap the button below to activate your slip code.</p>
                    {isWinner && (
                        <div className="flex justify-center">
                            <button
                                onClick={handleProceedToNext}
                                className="mt-5 bg-[#DCD7C9] text-[#2C3639] py-2 px-8 rounded-full hover:bg-[#2C3639] hover:text-[#DCD7C9] focus:outline-none transition-colors duration-500"
                            >
                                Proceed to Next
                            </button>
                        </div>

                    )}
                </>
            ) : paymentSteps.length === 0 ? (

                <div className="flex flex-col justify-center items-center h-full mt-5 gap-5">
                    <div>
                        <h2 className="text-lg text-center text-[#2C3639]">Complete Your Purchase</h2>
                        <p className='text-center pr-20 pl-20 text-[#2C3639]'>Please initiate the payment and complete the required steps to proceed to the next stage. Upon completion, you will receive a slip code and QR code to collect your item from the Auctregal headquarters.</p>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="bg-[#2C3639] text-[#DCD7C9] py-2 px-8 rounded-full hover:bg-[#DCD7C9] hover:text-[#2C3639] focus:outline-none transition-colors duration-500"
                    >
                        Initiate Payment
                    </button>
                </div>

            ) : (
                <>
                    <div>
                        <h2 className="text-lg text-center text-[#2C3639]">Complete Your Purchase</h2>
                        <p className='text-center pr-20 pl-20 text-[#2C3639]'>Please initiate the payment and complete the required steps to proceed to the next stage. Upon completion, you will receive a slip code and QR code to collect your item from the Auctregal headquarters.</p>
                    </div>
                    <p className='text-center pt-8 text-[#2C3639] text-lg'>Payment Step - {currentPaymentStep + 1} of {paymentSteps.length}</p>
                    <p className='text-center text-[#2C3639] pb-6'>Amount - {formatPrice(paymentSteps[currentPaymentStep].amount)}</p>
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            clientSecret={clientSecret}
                            email={userData.email}
                            onPaymentSuccess={handlePaymentSuccess}
                        />
                    </Elements>
                </>
            )}
        </div>
    );

    const renderCurrentBidding = () => (
        <>
            <div className="flex flex-row justify-between pr-20 pl-20 pt-10">
                <div className="font-thin">
                    <p>Remaining time for bidding on the item</p>
                    <p className="text-lg mt-2"><span className="text-4xl text-red-500 font-thin">{timeLeft}</span></p>
                </div>
                <div>
                    <p className="mt-2 font-thin">Current bid amount for the item</p>
                    <p className="text-4xl font-black flex items-center">
                        {formatPrice(currentPrice)}
                        <GiTakeMyMoney className="ml-2 text-4xl" />
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center pt-8">
                <p className="text-7xl font-thin tracking-tighter">{item.category === 'Vehicles' ? item.make + " " + item.model : (item.category === 'Wine and Spirits' ? item.name : item.title)}</p>
                <p className="pl-32 pr-32 text-center font-thin mt-1">{item.description}</p>
                <p className='font-thin'>{item.category}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pl-20 pr-20">
                <div>
                    <Image
                        src={item.primaryImage}
                        alt={item.title}
                        width={630}
                        height={450}
                        className="rounded-lg shadow-lg"
                        objectFit="cover"
                        priority={true}
                    />
                    <div className="flex gap-20 mt-6">
                        {item.secondaryImages?.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Secondary ${index}`}
                                width={150}
                                height={100}
                                className="object-cover cursor-pointer mr-2 mb-2 rounded-lg"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-thin mb-2">Item Overview</h2>

                    <div className="w-full text-left font-thin">
                        {renderDescription()}
                    </div>
                    <div>
                        <BiddingForm
                            itemId={item._id}
                            basePrice={item.basePrice}
                            currentPrice={currentPrice}
                            onBidPlaced={handleBidPlaced}
                        />
                    </div>
                </div>
            </div>
            <Instruction />

            <div className="mt-10 px-10">
                <h3 className="text-xl text-center mb-4 text-[#DCD7C9] font-thin">Top 3 Recent Bidders</h3>
                <div className="overflow-x-auto">
                    <table className="w-3/6 mx-auto border-collapse">
                        <thead>
                            <tr className="text-left border-b border-gray-200">
                                <th className="px-4 py-2 text-[#DCD7C9] font-thin">Rank</th>
                                <th className="px-4 py-2 text-[#DCD7C9] font-thin">Name</th>
                                <th className="px-4 py-2 text-[#DCD7C9] font-thin">Bid Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.bidders
                                .sort((a, b) => b.bidAmount - a.bidAmount)
                                .slice(0, 3)
                                .map((bidder, index) => (
                                    <tr key={bidder.userId} className="border-b last:border-none border-gray-200">
                                        <td className="px-4 py-2 text-[#DCD7C9] font-thin">{index + 1}</td>
                                        <td className="px-4 py-2 text-[#DCD7C9] font-thin">{bidder.name}</td>
                                        <td className="px-4 py-2 text-[#DCD7C9] font-thin">{formatPrice(bidder.bidAmount)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>



            <div className="mt-10 px-20 flex flex-col items-center">
                <h3 className="text-4xl font-thin">Generate Bidding Key</h3>
                <p className='font-thin mb-5'>Please provide your email to continue with the payment process</p>
                {!biddingToken ? (
                    <>
                        <form onSubmit={handleGenerateToken} className="mb-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="px-3 py-2 border rounded mr-2 text-black"
                            />
                            <button type="submit" className="bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-950 focus:outline-none transition-colors duration-500">
                                Generate
                            </button>
                        </form>

                        {clientSecret && (
                            <div>
                                <h4 className="text-xl font-semibold mb-2 w-[670px] text-center">Make Payment</h4>
                                <p className="text-lg mb-2 text-center">Amount: {formatPrice(tokenAmount)}</p>
                                <Elements stripe={stripePromise}>
                                    <BiddingPaymentForm
                                        clientSecret={clientSecret}
                                        email={email}
                                        onPaymentBiddingSuccess={handleBiddingPaymentSuccess}
                                    />
                                </Elements>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-green-500">Bidding Token: {biddingToken}</p>
                )}
            </div>

            <Chatbot item={item} />
        </>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <BidderHeader />
            <Banner />
            <main>
                {item.currentStatus === 'closed' ? renderClosedBidding() : renderCurrentBidding()}
                {paymentHistory.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Payment History</h3>
                        <ul>
                            {paymentHistory.map((payment, index) => (
                                <li key={index}>
                                    Amount: {formatPrice(payment.amount)} -
                                    Date: {new Date(payment.paidAt).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ItemDetails;

const categoryFields: { [key: string]: string[] } = {
    'Art and Antiques': ['Title', 'Artist', 'Year', 'Medium', 'Dimensions', 'Condition', 'Provenance'],
    'Jewelry and Watches': ['Title', 'Brand', 'Brand', 'Material', 'Gemstone', 'Carat Weight', 'Condition', 'Certification'],
    'Vehicles': ['Make', 'Model', 'Year', 'Mileage', 'VIN', 'Condition', 'Color'],
    'Wine and Spirits': ['Name', 'Type', 'Vintage', 'Region', 'ABV', 'Bottle Size', 'Condition'],
    'Rare Books and Manuscripts': ['Title', 'Author', 'Year', 'Condition', 'Edition', 'Publisher', 'Language'],
    'Collectables': ['Title', 'Type', 'Era', 'Condition', 'Rarity', 'Manufacturer'],
};












