// 'use client'

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const ITEMS_PER_PAGE = 3;

// interface Item {
//   _id: string;
//   primaryImage: string;
//   title?: string;
//   name?: string;
//   model?: string;
//   make?: string;
//   description: string;
//   category: string;
//   basePrice: number;
// }

// const ClosedBidding = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [items, setItems] = useState<Item[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchItems = async () => {
//             try {
//                 const response = await fetch('https://auctregal.rudopedia.shop/items/closed');
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
//         <div className='bg-[#361500] pt-10 pb-20'>
//             <div className="max-w-[90%] mx-auto">
//                 <h1 className='text-4xl font-thin text-center text-white mb-4'>
//                     Closed Auctions
//                 </h1>
//                 <p className='text-center font-thin mb-10 text-gray-300'>
//                     Check out the items from our recently closed auctions. Stay tuned for more exciting opportunities!
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
//                     {currentItems.map((item) => (
//                         <Link key={item._id} href={`/auction/${item._id}`}>
//                             <div className="relative flex items-center justify-center cursor-pointer px-2">
//                                 <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
//                                     <Image
//                                         src={item.primaryImage}
//                                         alt={item.title || item.name || `${item.model} ${item.make}`}
//                                         layout="fill"
//                                         objectFit="cover"
//                                         style={{ opacity: 0.5 }}
//                                         priority
//                                     />
//                                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
//                                         <h2 className="text-xl font-thin mb-2">
//                                             {item.title || item.name || `${item.model} ${item.make}`}
//                                         </h2>
//                                         <p className="font-thin mb-2">{item.description}</p>
//                                         <p className="font-thin">{item.category}</p>
//                                         {/* <p className="text-lg font-thin mb-2">₹{item.basePrice.toLocaleString('en-IN')}</p> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//                 <div className="flex justify-center pt-10">
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => handleClick(index + 1)}
//                             className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-[#2C3639] text-[#DCD7C9]' : 'bg-[#A27B5C] text-[#2C3639]'}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ClosedBidding;



'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ITEMS_PER_PAGE = 3;

interface Item {
  _id: string;
  primaryImage: string;
  title?: string;
  name?: string;
  model?: string;
  make?: string;
  description: string;
  category: string;
  basePrice: number;
}

const ClosedBidding = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('https://auctregal.rudopedia.shop/items/closed');
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
        <div className="bg-[#361500] py-10">
            <div className="max-w-[90%] mx-auto">
                <h1 className='text-3xl sm:text-4xl font-thin text-center text-white mb-4'>
                    Closed Auctions
                </h1>
                <p className='text-center font-thin mb-10 text-sm sm:text-base text-gray-300'>
                    Check out the items from our recently closed auctions. Stay tuned for more exciting opportunities!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-10">
                    {currentItems.map((item) => (
                        <Link key={item._id} href={`/auction/${item._id}`}>
                            <div className="relative flex items-center justify-center cursor-pointer px-2">
                                <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src={item.primaryImage}
                                        alt={item.title || item.name || `${item.model} ${item.make}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="opacity-70"
                                        priority
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-thin mb-2">
                                            {item.title || item.name || `${item.model} ${item.make}`}
                                        </h2>
                                        <p className="text-xs sm:text-sm md:text-base font-thin mb-2">{item.description}</p>
                                        <p className="text-xs sm:text-sm md:text-base font-thin">{item.category}</p>
                                        {/* <p className="text-lg font-thin mb-2">₹{item.basePrice.toLocaleString('en-IN')}</p> */}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center pt-10 pb-4 px-4">
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
        </div>
    );
}

export default ClosedBidding;
