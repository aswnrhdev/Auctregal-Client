// 'use client';

// import { useState, useEffect, useCallback, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { Footer } from "@/components/Bidder Components/Bidder Footer/page";
// import BidderHeader from "@/components/Bidder Components/Bidder Header/page";
// import axios from 'axios';
// import Banner from '@/components/Bidder Components/Checkout Page/Banner Section/page';
// import { IoMdDoneAll } from "react-icons/io";
// import { MdVerified } from "react-icons/md";
// import GoogleMap from '@/components/Bidder Components/Checkout Page/Google Map/page';
// import Image from 'next/image';

// interface CheckoutData {
//   slipData?: {
//     qrCode: string;
//     slipCode: string;
//   };
//   itemData: {
//     category: string;
//     primaryImage?: string;
//     title: string;
//     basePrice: number;
//     currentPrice: number;
//     transactionStatus: string;
//   };
//   userData: {
//     name: string;
//     email: string;
//     auctCode: string;
//   };
// }

// const CheckoutContent: React.FC = () => {
//     const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const searchParams = useSearchParams();
//     const itemId = searchParams.get('itemId');
//     const userId = searchParams.get('userId');

//     const fetchCheckoutData = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get<CheckoutData>(`https://auctregal.rudopedia.shop/checkout-data?userId=${userId}&itemId=${itemId}`);
//             setCheckoutData(response.data);
//         } catch (error) {
//             console.error('Error fetching checkout data:', error);
//             setError('Failed to fetch checkout data. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     }, [userId, itemId]);

//     useEffect(() => {
//         if (itemId && userId) {
//             fetchCheckoutData();
//         }
//     }, [itemId, userId, fetchCheckoutData]);

//     const handleGenerateSlip = async () => {
//         if (checkoutData?.slipData) {
//             return;
//         }

//         try {
//             const response = await axios.post<{ slip: CheckoutData['slipData'] }>('https://auctregal.rudopedia.shop/generate-slip', { userId, itemId });
//             setCheckoutData(prevData => prevData ? ({
//                 ...prevData,
//                 slipData: response.data.slip
//             }) : null);
//         } catch (error) {
//             console.error('Error generating slip:', error);
//             setError('Failed to generate slip. Please try again.');
//         }
//     };

//     const formatCurrency = (amount: number) => {
//         return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
//     };

//     if (loading) {
//         return <div className="text-center mt-24">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-center mt-24 text-red-500">{error}</div>;
//     }

//     return (
//         <>
//             <div className="flex flex-col">
//                 <BidderHeader />
//                 <Banner />

//                 <div className='flex flex-col items-center gap-2 p-5'>
//                     {!checkoutData?.slipData && (
//                         <div className='flex flex-col items-center gap-2 p-5'>
//                             <p>Click below to generate the slip code and QR for the item. Please do not share the code and QR with anyone else, as they contain your personal information and bidding details.</p>
//                             <button
//                                 className='bg-orange-900 text-white py-2 px-8 rounded-md hover:bg-black mt-3 transition-all duration-500 cursor-pointer'
//                                 onClick={handleGenerateSlip}
//                             >
//                                 Generate Slip
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {checkoutData?.slipData && (
//                     <div className="flex flex-col items-center pl-60">
//                         <div className="flex gap-10 items-center">
//                             <div className="flex-shrink-0">
//                                 <Image
//                                     src={checkoutData.slipData.qrCode}
//                                     alt="QR Code"
//                                     width={160}
//                                     height={160}
//                                     className="object-cover"
//                                     priority={true}
//                                 />
//                             </div>
//                             <div className="flex flex-col justify-center">
//                                 <p className="flex items-center ml-2">
//                                     <span>Slip Code {checkoutData.slipData.slipCode}</span>
//                                     <MdVerified className="ml-1" />
//                                 </p>
//                                 <p className='ml-2 pr-60'>Please verify and securely store your QR code and slip code...</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {checkoutData && (
//                     <div className='flex flex-col p-10 items-center'>
//                         <h1>Order Summary</h1>
//                         <div className='grid grid-flow-col gap-80 mt-5'>
//                             <div className="flex flex-col gap-2">
//                                 <h1>Item Information</h1>
//                                 <hr className="border-t border-gray-300" />
//                                 <p>{checkoutData.itemData.category}</p>
//                                 {checkoutData.itemData.primaryImage && (
//                                     <Image
//                                         src={checkoutData.itemData.primaryImage}
//                                         alt={checkoutData.itemData.title}
//                                         width={640}
//                                         height={160}
//                                         className="object-cover rounded-lg"
//                                         priority={true}
//                                     />
//                                 )}
//                                 <p>Base Price - <span className="text-blue-500">{formatCurrency(checkoutData.itemData.basePrice)}</span></p>
//                                 <p>Current Price - <span className="text-green-500">{formatCurrency(checkoutData.itemData.currentPrice)}</span></p>
//                                 <p className="flex items-center">
//                                     Transaction Status -<span className="text-green-500 flex items-center ml-2">
//                                         {checkoutData.itemData.transactionStatus}
//                                         <IoMdDoneAll className="ml-1" />
//                                     </span>
//                                 </p>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                                 <h1>User Information</h1>
//                                 <hr className="border-t border-gray-300" />
//                                 <p>Name - {checkoutData.userData.name}</p>
//                                 <p>User Email - {checkoutData.userData.email}</p>
//                                 <p className="text-blue-500">Auct Code - {checkoutData.userData.auctCode}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <GoogleMap />
//                 <Footer />
//             </div>
//         </>
//     );
// }

// const Checkout: React.FC = () => {
//     return (
//         <Suspense fallback={<div className="text-center mt-24">Loading...</div>}>
//             <CheckoutContent />
//         </Suspense>
//     );
// };

// export default Checkout;



'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Footer } from "@/components/Bidder Components/Bidder Footer/page";
import BidderHeader from "@/components/Bidder Components/Bidder Header/page";
import axios from 'axios';
import Banner from '@/components/Bidder Components/Checkout Page/Banner Section/page';
import { IoMdDoneAll } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import GoogleMap from '@/components/Bidder Components/Checkout Page/Google Map/page';
import Image from 'next/image';

interface CheckoutData {
  slipData?: {
    qrCode: string;
    slipCode: string;
  };
  itemData: {
    category: string;
    primaryImage?: string;
    title: string;
    basePrice: number;
    currentPrice: number;
    transactionStatus: string;
  };
  userData: {
    name: string;
    email: string;
    auctCode: string;
  };
}

const CheckoutContent: React.FC = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const itemId = searchParams.get('itemId');
  const userId = searchParams.get('userId');

  const fetchCheckoutData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<CheckoutData>(`https://auctregal.rudopedia.shop/checkout-data?userId=${userId}&itemId=${itemId}`);
      setCheckoutData(response.data);
    } catch (error) {
      console.error('Error fetching checkout data:', error);
      setError('Failed to fetch checkout data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [userId, itemId]);

  useEffect(() => {
    if (itemId && userId) {
      fetchCheckoutData();
    }
  }, [itemId, userId, fetchCheckoutData]);

  const handleGenerateSlip = async () => {
    if (checkoutData?.slipData) {
      return;
    }

    try {
      const response = await axios.post<{ slip: CheckoutData['slipData'] }>('https://auctregal.rudopedia.shop/generate-slip', { userId, itemId });
      setCheckoutData(prevData => prevData ? ({
        ...prevData,
        slipData: response.data.slip
      }) : null);
    } catch (error) {
      console.error('Error generating slip:', error);
      setError('Failed to generate slip. Please try again.');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  if (loading) {
    return <div className="text-center mt-24">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-24 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex flex-col">
        <BidderHeader />
        <Banner />

        <div className="flex flex-col items-center gap-2 p-5">
          {!checkoutData?.slipData && (
            <div className="flex flex-col items-center gap-2 p-5">
              <p className="text-center">
                Click below to generate the slip code and QR for the item. Please do not share the code and QR with anyone else, as they contain your personal information and bidding details.
              </p>
              <button
                className="bg-orange-900 text-white py-2 px-8 rounded-md hover:bg-black mt-3 transition-all duration-500 cursor-pointer"
                onClick={handleGenerateSlip}
              >
                Generate Slip
              </button>
            </div>
          )}
        </div>

        {checkoutData?.slipData && (
          <div className="flex flex-col items-center px-5 lg:px-60 mt-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0">
                <Image
                  src={checkoutData.slipData.qrCode}
                  alt="QR Code"
                  width={160}
                  height={160}
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="flex items-center">
                  Slip Code {checkoutData.slipData.slipCode}
                  <MdVerified className="ml-1" />
                </p>
                <p className="pr-2 md:pr-60">Please verify and securely store your QR code and slip code...</p>
              </div>
            </div>
          </div>
        )}

        {checkoutData && (
          <div className="flex flex-col p-5 md:p-10 items-center">
            <h1 className="text-xl md:text-2xl font-bold">Order Summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">Item Information</h1>
                <hr className="border-t border-gray-300" />
                <p>{checkoutData.itemData.category}</p>
                {checkoutData.itemData.primaryImage && (
                  <img
                  src={checkoutData.itemData.primaryImage}
                  alt={checkoutData.itemData.title}
                  width={640}
                  height={160}
                  className="object-cover rounded-lg"
                  style={{ objectFit: "cover" }}
                />                
                )}
                <p>Base Price - <span className="text-blue-500">{formatCurrency(checkoutData.itemData.basePrice)}</span></p>
                <p>Current Price - <span className="text-green-500">{formatCurrency(checkoutData.itemData.currentPrice)}</span></p>
                <p className="flex items-center">
                  Transaction Status -<span className="text-green-500 flex items-center ml-2">
                    {checkoutData.itemData.transactionStatus}
                    <IoMdDoneAll className="ml-1" />
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">User Information</h1>
                <hr className="border-t border-gray-300" />
                <p>Name - {checkoutData.userData.name}</p>
                <p>User Email - {checkoutData.userData.email}</p>
                <p className="text-blue-500">Auct Code - {checkoutData.userData.auctCode}</p>
              </div>
            </div>
          </div>
        )}

        <GoogleMap />
        <Footer />
      </div>
    </>
  );
};

const Checkout: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-center mt-24">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;
