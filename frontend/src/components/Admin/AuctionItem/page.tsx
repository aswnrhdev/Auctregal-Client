// 'use client'

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const categories = [
//     'Art and Antiques',
//     'Jewelry and Watches',
//     'Collectables',
//     'Vehicles',
//     'Wine and Spirits',
//     'Rare Books and Manuscripts'
// ];

// const categoryFields: Record<string, string[]> = {
//     'Art and Antiques': ['Title', 'Artist'],
//     'Jewelry and Watches': ['Title', 'Brand', 'Carat Weight'],
//     'Collectables': ['Title', 'Type', 'Era', 'Rarity'],
//     'Vehicles': ['Make', 'Model', 'Year'],
//     'Wine and Spirits': ['Name', 'Type'],
//     'Rare Books and Manuscripts': ['Title', 'Author', 'Year']
// };

// interface ItemTableProps {
//     category: string;
//     items: any[];
//     onSetUpcoming: (itemId: string) => void;
//     onAddToBid: (itemId: string, duration: number) => void;
//     onRemoveItem: (itemId: string) => void;
// }

// const ItemTable: React.FC<ItemTableProps> = ({ category, items, onSetUpcoming, onAddToBid, onRemoveItem }) => {
//     const getHeaders = () => {
//         if (category === 'Upcoming') {
//             return ['Image', 'Base Price', 'Category', 'Details', 'Action'];
//         } else if (category === 'Bidding') {
//             return ['Image', 'Base Price', 'Current Price', 'Category', 'End Time', 'Details', 'Action'];
//         } else {
//             return ['Image', ...categoryFields[category], 'Base Price', 'Current Price', 'Action'];
//         }
//     };

//     const getItemDetails = (item: any) => {
//         if (category === 'Upcoming' || category === 'Bidding') {
//             const itemCategory = item.category;
//             return categoryFields[itemCategory].map(field => {
//                 const fieldKey = field.toLowerCase().replace(/\s+/g, '');
//                 return `${field}: ${item[fieldKey] || item[field] || ''}`;
//             }).join(', ');
//         }
//         return '';
//     };

//     return (
//         <div className="overflow-x-auto mb-8 bg-[#1A120B] p-5 rounded-lg">
//             <h2 className="text-xl mb-4 font-thin">{category}</h2>
//             <table className="w-full border-collapse border- border-[#D5CEA3] bg-[#3C2A21] rounded-lg">
//                 <thead>
//                     <tr className="bg-[#D5CEA3] text-black font-light">
//                         {getHeaders().map((header, index) => (
//                             <th key={index} className="border border-[#D5CEA3] p-2 text-start">{header}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {items.map((item, index) => (
//                         <tr key={index}>
//                             <td className="border border-gray-300 p-2">
//                                 {item.primaryImage && (
//                                     <img src={item.primaryImage} alt={item.title} className="w-16 h-16 object-cover" />
//                                 )}
//                             </td>
//                             {category === 'Upcoming' ? (
//                                 <>
//                                     <td className="border border-gray-300 p-2 font-thin">{item.basePrice}</td>
//                                     <td className="border border-gray-300 p-2 font-thin">{item.category}</td>
//                                     {/* <td className="border border-gray-300 p-2 font-thin">{item.interestCount}</td> */}
//                                     <td className="border border-gray-300 p-2 font-thin">{getItemDetails(item)}</td>
//                                     <td className="border border-gray-300 p-2 font-thin">
//                                         <select
//                                             onChange={(e) => onAddToBid(item._id, parseInt(e.target.value))}
//                                             className="w-full bg-[#1A120B] text-white p-2 rounded font-thin"
//                                         >
//                                             <option value="">Add to Bid</option>
//                                             <option value="4">4 days</option>
//                                             <option value="5">5 days</option>
//                                             <option value="6">6 days</option>
//                                         </select>
//                                     </td>
//                                 </>
//                             ) : category === 'Bidding' ? (
//                                 <>
//                                     <td className="border border-gray-300 p-2 font-thin">{item.basePrice}</td>
//                                     <td className="border border-gray-300 p-2 font-thin">{item.currentPrice}</td>
//                                     <td className="border border-gray-300 p-1 font-thin">{item.category}</td>
//                                     <td className="border border-gray-300 p-1 font-thin">{new Date(item.bidEndTime).toLocaleString()}</td>
//                                     <td className="border border-gray-300 p-2 font-thin">{getItemDetails(item)}</td>
//                                     <td className="border border-gray-300 p-2">
//                                         <button
//                                             onClick={() => onRemoveItem(item._id)}
//                                             className="w-full bg-red-900 text-white p-2 rounded font-thin"
//                                         >
//                                             Remove
//                                         </button>
//                                     </td>
//                                 </>
//                             ) : (
//                                 <>
//                                     {categoryFields[category].map((field, fieldIndex) => (
//                                         <td key={fieldIndex} className="border border-gray-300 p-2 font-thin">
//                                             {item[field.toLowerCase().replace(/\s+/g, '')] || item[field]}
//                                         </td>
//                                     ))}
//                                     <td className="border border-gray-300 p-2 font-thin">{item.basePrice}</td>
//                                     <td className="border border-gray-300 p-2 font-thin">{item.currentPrice}</td>
//                                     <td className="border border-gray-300 p-2 font-thin">
//                                         <button
//                                             onClick={() => onSetUpcoming(item._id)}
//                                             className="w-full bg-[#1A120B] text-white p-2 rounded transform transition-transform duration-200 hover:scale-110"
//                                         >
//                                             Set to Upcoming
//                                         </button>
//                                     </td>
//                                 </>
//                             )}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// const AuctionItem = () => {
//     const [items, setItems] = useState<Record<string, any[]>>({});
//     const [upcomingItems, setUpcomingItems] = useState<any[]>([]);
//     const [biddingItems, setBiddingItems] = useState<any[]>([]);

//     useEffect(() => {
//         fetchItems();
//         fetchUpcomingItems();
//         fetchBiddingItems();
//         const intervalId = setInterval(closeBids, 60000); // Check every minute
//         return () => clearInterval(intervalId);
//     }, []);

//     const fetchItems = async () => {
//         try {
//             const results = await Promise.all(
//                 categories.map(async (category) => {
//                     const response = await axios.get(`http://localhost:5000/admin/items/${encodeURIComponent(category)}`);
//                     return { category, items: response.data };
//                 })
//             );

//             const itemsByCategory: Record<string, any[]> = {};
//             results.forEach(({ category, items }) => {
//                 itemsByCategory[category] = items;
//             });

//             setItems(itemsByCategory);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//         }
//     };

//     const fetchUpcomingItems = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/admin/items/status/upcoming');
//             setUpcomingItems(response.data);
//         } catch (error) {
//             console.error('Error fetching upcoming items:', error);
//         }
//     };

//     const fetchBiddingItems = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/admin/items/status/bidding');
//             setBiddingItems(response.data);
//         } catch (error) {
//             console.error('Error fetching bidding items:', error);
//         }
//     };

//     const handleSetUpcoming = async (itemId: string) => {
//         try {
//             await axios.put(`http://localhost:5000/admin/item/${itemId}/set-upcoming`);
//             fetchItems();
//             fetchUpcomingItems();
//         } catch (error) {
//             console.error('Error setting item to upcoming:', error);
//         }
//     };

//     const handleAddToBid = async (itemId: string, duration: number) => {
//         try {
//             await axios.put(`http://localhost:5000/admin/item/${itemId}/add-to-bid`, { duration });
//             fetchUpcomingItems();
//             fetchBiddingItems();
//         } catch (error) {
//             console.error('Error adding item to bid:', error);
//         }
//     };

//     const handleRemoveItem = async (itemId: string) => {
//         try {
//             await axios.delete(`http://localhost:5000/admin/item/${itemId}`);
//             fetchItems();
//             fetchUpcomingItems();
//             fetchBiddingItems();
//         } catch (error) {
//             console.error('Error removing item:', error);
//         }
//     };

//     const closeBids = async () => {
//         try {
//             await axios.post('http://localhost:5000/admin/close-bids');
//             fetchBiddingItems();
//         } catch (error) {
//             console.error('Error closing bids:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* <h1 className="text-2xl font-bold mb-6">Auction Items</h1> */}

//             {/* <h2 className="text-xl font-bold mb-4">Category Items</h2> */}
//             {categories.map((category) => (
//                 <ItemTable
//                     key={category}
//                     category={category}
//                     items={items[category] || []}
//                     onSetUpcoming={handleSetUpcoming}
//                     onAddToBid={handleAddToBid}
//                     onRemoveItem={handleRemoveItem}
//                 />
//             ))}

//             {/* <h2 className="text-xl font-bold mb-4">Upcoming Auction Items</h2> */}
//             <ItemTable
//                 category="Upcoming"
//                 items={upcomingItems}
//                 onSetUpcoming={handleSetUpcoming}
//                 onAddToBid={handleAddToBid}
//                 onRemoveItem={handleRemoveItem}
//             />

//             {/* <h2 className="text-xl font-bold mb-4">Currently Bidding Items</h2> */}
//             <ItemTable
//                 category="Bidding"
//                 items={biddingItems}
//                 onSetUpcoming={handleSetUpcoming}
//                 onAddToBid={handleAddToBid}
//                 onRemoveItem={handleRemoveItem}
//             />
//         </div>
//     );
// };

// export default AuctionItem;




'use client'

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';

const categories = [
    'Art and Antiques',
    'Jewelry and Watches',
    'Collectables',
    'Vehicles',
    'Wine and Spirits',
    'Rare Books and Manuscripts'
];

const categoryFields: Record<string, string[]> = {
    'Art and Antiques': ['Title', 'Artist'],
    'Jewelry and Watches': ['Title', 'Brand', 'Carat Weight'],
    'Collectables': ['Title', 'Type', 'Era', 'Rarity'],
    'Vehicles': ['Make', 'Model', 'Year'],
    'Wine and Spirits': ['Name', 'Type'],
    'Rare Books and Manuscripts': ['Title', 'Author', 'Year']
};

interface ItemTableProps {
    category: string;
    items: any[];
    onSetUpcoming: (itemId: string) => void;
    onAddToBid: (itemId: string, duration: number) => void;
    onRemoveItem: (itemId: string) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ category, items, onSetUpcoming, onAddToBid, onRemoveItem }) => {
    const getHeaders = () => {
        if (category === 'Upcoming') {
            return ['Image', 'Base Price', 'Category', 'Details', 'Action'];
        } else if (category === 'Bidding') {
            return ['Image', 'Base Price', 'Current Price', 'Category', 'End Time', 'Details', 'Action'];
        } else {
            return ['Image', ...categoryFields[category], 'Base Price', 'Current Price', 'Action'];
        }
    };

    const getItemDetails = (item: any) => {
        if (category === 'Upcoming' || category === 'Bidding') {
            const itemCategory = item.category;
            return categoryFields[itemCategory].map(field => {
                const fieldKey = field.toLowerCase().replace(/\s+/g, '');
                return `${field}: ${item[fieldKey] || item[field] || ''}`;
            }).join(', ');
        }
        return '';
    };

    return (
        <div className="overflow-x-auto mb-8 bg-[#1A120B] p-5 rounded-lg">
            <h2 className="text-xl mb-4 font-thin">{category}</h2>
            <table className="w-full border-collapse border- border-[#D5CEA3] bg-[#3C2A21] rounded-lg">
                <thead>
                    <tr className="bg-[#D5CEA3] text-black font-light">
                        {getHeaders().map((header, index) => (
                            <th key={index} className="border border-[#D5CEA3] p-2 text-start">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">
                                {item.primaryImage && (
                                    <Image src={item.primaryImage} alt={item.title} width={64} height={64} className="object-cover" />
                                )}
                            </td>
                            {category === 'Upcoming' ? (
                                <>
                                    <td className="border border-gray-300 p-2 font-thin">{item.basePrice}</td>
                                    <td className="border border-gray-300 p-2 font-thin">{item.category}</td>
                                    <td className="border border-gray-300 p-2 font-thin">{getItemDetails(item)}</td>
                                    <td className="border border-gray-300 p-2 font-thin">
                                        <select
                                            onChange={(e) => onAddToBid(item._id, parseInt(e.target.value))}
                                            className="w-full bg-[#1A120B] text-white p-2 rounded font-thin"
                                        >
                                            <option value="">Add to Bid</option>
                                            <option value="4">4 days</option>
                                            <option value="5">5 days</option>
                                            <option value="6">6 days</option>
                                        </select>
                                    </td>
                                </>
                            ) : category === 'Bidding' ? (
                                <>
                                    <td className="border border-gray-300 p-2 font-thin">{item.basePrice}</td>
                                    <td className="border border-gray-300 p-2 font-thin">{item.currentPrice}</td>
                                    <td className="border border-gray-300 p-1 font-thin">{item.category}</td>
                                    <td className="border border-gray-300 p-1 font-thin">{new Date(item.bidEndTime).toLocaleString()}</td>
                                    <td className="border border-gray-300 p-2 font-thin">{getItemDetails(item)}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => onRemoveItem(item._id)}
                                            className="w-full bg-red-900 text-white p-2 rounded font-thin"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    {categoryFields[category].map((field, fieldIndex) => (
                                        <td key={fieldIndex} className="border border-gray-300 p-2 font-thin">
                                            {item[field.toLowerCase().replace(/\s+/g, '')] || item[field]}
                                        </td>
                                    ))}
                                    <td className="border border-gray-300 p-2 font-thin">{item.basePrice}</td>
                                    <td className="border border-gray-300 p-2 font-thin">{item.currentPrice}</td>
                                    <td className="border border-gray-300 p-2 font-thin">
                                        <button
                                            onClick={() => onSetUpcoming(item._id)}
                                            className="w-full bg-[#1A120B] text-white p-2 rounded transform transition-transform duration-200 hover:scale-110"
                                        >
                                            Set to Upcoming
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const AuctionItem = () => {
    const [items, setItems] = useState<Record<string, any[]>>({});
    const [upcomingItems, setUpcomingItems] = useState<any[]>([]);
    const [biddingItems, setBiddingItems] = useState<any[]>([]);

    const fetchItems = useCallback(async () => {
        try {
            const results = await Promise.all(
                categories.map(async (category) => {
                    const response = await axios.get(`http://localhost:5000/admin/items/${encodeURIComponent(category)}`);
                    return { category, items: response.data };
                })
            );

            const itemsByCategory: Record<string, any[]> = {};
            results.forEach(({ category, items }) => {
                itemsByCategory[category] = items;
            });

            setItems(itemsByCategory);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, []);

    const fetchUpcomingItems = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/items/status/upcoming');
            setUpcomingItems(response.data);
        } catch (error) {
            console.error('Error fetching upcoming items:', error);
        }
    }, []);

    const fetchBiddingItems = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/items/status/bidding');
            setBiddingItems(response.data);
        } catch (error) {
            console.error('Error fetching bidding items:', error);
        }
    }, []);

    const handleSetUpcoming = async (itemId: string) => {
        try {
            await axios.put(`http://localhost:5000/admin/item/${itemId}/set-upcoming`);
            fetchItems();
            fetchUpcomingItems();
        } catch (error) {
            console.error('Error setting item to upcoming:', error);
        }
    };

    const handleAddToBid = async (itemId: string, duration: number) => {
        try {
            await axios.put(`http://localhost:5000/admin/item/${itemId}/add-to-bid`, { duration });
            fetchUpcomingItems();
            fetchBiddingItems();
        } catch (error) {
            console.error('Error adding item to bid:', error);
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await axios.delete(`http://localhost:5000/admin/item/${itemId}`);
            fetchItems();
            fetchUpcomingItems();
            fetchBiddingItems();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const closeBids = useCallback(async () => {
        try {
            await axios.post('http://localhost:5000/admin/close-bids');
            fetchBiddingItems();
        } catch (error) {
            console.error('Error closing bids:', error);
        }
    }, [fetchBiddingItems]);

    useEffect(() => {
        fetchItems();
        fetchUpcomingItems();
        fetchBiddingItems();

        const intervalId = setInterval(closeBids, 60000); // Check every minute
        return () => clearInterval(intervalId);
    }, [fetchItems, fetchUpcomingItems, fetchBiddingItems, closeBids]);

    return (
        <div className="container mx-auto px-4 py-8">
            {categories.map((category) => (
                <ItemTable
                    key={category}
                    category={category}
                    items={items[category] || []}
                    onSetUpcoming={handleSetUpcoming}
                    onAddToBid={handleAddToBid}
                    onRemoveItem={handleRemoveItem}
                />
            ))}

            <ItemTable
                category="Upcoming"
                items={upcomingItems}
                onSetUpcoming={handleSetUpcoming}
                onAddToBid={handleAddToBid}
                onRemoveItem={handleRemoveItem}
            />

            <ItemTable
                category="Bidding"
                items={biddingItems}
                onSetUpcoming={handleSetUpcoming}
                onAddToBid={handleAddToBid}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

export default AuctionItem;
