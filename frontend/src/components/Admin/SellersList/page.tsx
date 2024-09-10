// 'use client';

// import { useState, useEffect, ChangeEvent } from 'react';
// import { fetchSellersApi, blockSellerApi, unblockSellerApi } from '@/api/adminApi';

// interface Seller {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     sellerScore: number;
//     isBlocked: boolean;
// }

// const SellersList = () => {
//     const [sellers, setSellers] = useState<Seller[]>([]);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchSellers = async () => {
//             try {
//                 const response = await fetchSellersApi();
//                 setSellers(response);
//             } catch (error) {
//                 console.error('Failed to fetch Sellers', error);
//             }
//         };
//         fetchSellers();
//     }, []);

//     const toggleBlockBidder = async (id: string, isBlocked: boolean) => {
//         try {
//             if (isBlocked) {
//                 await unblockSellerApi(id);
//             } else {
//                 await blockSellerApi(id);
//             }
//             setSellers(sellers.map(seller =>
//                 seller._id === id ? { ...seller, isBlocked: !seller.isBlocked } : seller
//             ));
//         } catch (error) {
//             console.error('Failed to update bidder status', error);
//         }
//     };

//     const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(e.target.value);
//     };

//     const filteredSellers = sellers.filter(seller =>
//         seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         seller.phone.includes(searchQuery) ||
//         seller.sellerScore.toString().includes(searchQuery) 
//     );

//     return (
//         <div className="p-6">
//             <h1 className="text-1xl italic mb-4">Sellers List</h1>
//             {/* <div className="mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search by name, email, phone, or score..."
//                     value={searchQuery}
//                     onChange={handleSearch}
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />
//             </div> */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white text-black border">
//                     <thead className='bg-gray-100 border-b border-gray-300'>
//                         <tr className='bg-black'>
//                             <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Name</th>
//                             <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Email</th>
//                             {/* <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Phone</th> */}
//                             <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Score</th>
//                             <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Status</th>
//                             <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredSellers.map(seller => (
//                             <tr key={seller._id} className='bg-black'>
//                                 <td className="py-3 px-4 text-sm text-gray-400">{seller.name}</td>
//                                 <td className="py-3 px-4 text-sm text-gray-400">{seller.email}</td>
//                                 {/* <td className="py-3 px-4 text-sm text-gray-400">{seller.phone}</td> */}
//                                 <td className="py-3 px-4 text-sm text-gray-400">{seller.sellerScore}</td> 
//                                 <td className="py-3 px-4 text-sm text-gray-400">
//                                     {seller.isBlocked ? 'Blocked' : 'Active'}
//                                 </td>
//                                 <td className="py-3 px-4 text-sm text-gray-400">
//                                     <button
//                                         className={`w-24 py-2 rounded ${seller.isBlocked ? 'bg-red-950 text-white' : 'bg-green-950 text-white'}`}
//                                         onClick={() => toggleBlockBidder(seller._id, seller.isBlocked)}
//                                     >
//                                         {seller.isBlocked ? 'Unblock' : 'Block'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default SellersList;
