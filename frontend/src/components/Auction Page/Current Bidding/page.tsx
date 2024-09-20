// 'use client'

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const ITEMS_PER_PAGE = 6;

// interface Item {
//   _id: string;
//   primaryImage: string;
//   title?: string;
//   name?: string;
//   make?: string;
//   model?: string;
//   description: string;
//   category: string;
//   currentPrice: number;
// }

// export function CurrentBidding() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [items, setItems] = useState<Item[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchItems = async () => {
//             try {
//                 const response = await fetch('https://auctregal.rudopedia.shop/items/bidding');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch items');
//                 }
//                 const data = await response.json();
//                 setItems(data);
//             } catch (error) {
//                 console.error('Error fetching items:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchItems();
//     }, []);

//     const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const currentItems = items.slice(startIndex, endIndex);

//     const handleClick = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="relative bg-[#361500] text-white">
//             <h1 className='text-4xl font-thin text-center pt-10'>
//                 Available Bids
//             </h1>
//             <p className='text-center font-thin mt-4 px-4'>
//                 Explore the available bids below. To participate, secure your bidding rights by paying a 10% deposit of the item&apos;s base price. Seize the opportunity to make it yours.
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-10 pt-10">
//                 {currentItems.map((item) => (
//                     <Link href={`/auction/${item._id}`} key={item._id}>
//                         <div className="overflow-hidden rounded-lg shadow-lg relative h-[400px]">
//                             <Image
//                                 src={item.primaryImage}
//                                 alt={item.title || item.name || `${item.make} ${item.model}`}
//                                 fill
//                                 style={{ objectFit: "cover" }}
//                                 className="opacity-70"
//                                 priority
//                             />
//                             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
//                                 <h2 className="text-xl font-thin">
//                                     {item.title || item.name || `${item.make} ${item.model}`}
//                                 </h2>
//                                 <p className="text-sm font-thin">{item.description}</p>
//                                 <p className="text-sm font-thin mb-2">{item.category}</p>
//                                 {/* <p className="text-lg font-thin mb-2">₹{item.currentPrice.toLocaleString('en-IN')}</p> */}
//                                 <p className="text-green-500 font-thin text-lg">Currently Bidding</p>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//             <div className="flex justify-center pt-10 pb-10">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handleClick(index + 1)}
//                         className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-[#2C3639] text-[#DCD7C9]' : 'bg-[#A27B5C] text-[#2C3639]'}`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }



'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ITEMS_PER_PAGE = 6;

interface Item {
    _id: string;
    primaryImage: string;
    title?: string;
    name?: string;
    make?: string;
    model?: string;
    description: string;
    category: string;
    currentPrice: number;
}

export function CurrentBidding() {
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('https://auctregal.rudopedia.shop/items/bidding');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = items.slice(startIndex, endIndex);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="relative bg-[#361500] text-white py-10">
            <h1 className='text-3xl sm:text-4xl font-thin text-center'>
                Available Bids
            </h1>
            <p className='text-center font-thin mt-4 px-4 text-sm sm:text-base'>
                Explore the available bids below. To participate, secure your bidding rights by paying a 10% deposit of the item&#39;s base price. Seize the opportunity to make it yours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-10 pt-10">
                {currentItems.map((item) => (
                    <Link href={`/auction/${item._id}`} key={item._id}>
                        <div className="relative overflow-hidden rounded-lg shadow-lg h-[300px] sm:h-[350px] lg:h-[400px]">
                            <img
                                src={item.primaryImage}
                                alt={item.title || item.name || `${item.make} ${item.model}` || 'Image'}
                                className="opacity-70"
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-thin">
                                    {item.title || item.name || `${item.make} ${item.model}`}
                                </h2>
                                <p className="text-xs sm:text-sm md:text-base font-thin">{item.description}</p>
                                <p className="text-xs sm:text-sm md:text-base font-thin mb-2">{item.category}</p>
                                <p className="text-green-500 font-thin text-lg">Currently Bidding</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex justify-center pt-10 pb-10 px-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full text-sm sm:text-base ${currentPage === index + 1 ? 'bg-[#2C3639] text-[#DCD7C9]' : 'bg-[#A27B5C] text-[#2C3639]'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
