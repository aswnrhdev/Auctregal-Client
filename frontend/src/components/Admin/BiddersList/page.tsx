'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { fetchBiddersApi, blockBidderApi, unblockBidderApi } from '@/api/adminApi';

interface Bidder {
    _id: string;
    name: string;
    email: string;
    phone: string;
    bidderScore: number;
    isBlocked: boolean;
}

const BiddersList = () => {
    const [bidders, setBidders] = useState<Bidder[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBidders = async () => {
            try {
                const response = await fetchBiddersApi();
                setBidders(response);
            } catch (error) {
                console.error('Failed to fetch bidders', error);
            }
        };
        fetchBidders();
    }, []);

    const toggleBlockBidder = async (id: string, isBlocked: boolean) => {
        try {
            if (isBlocked) {
                await unblockBidderApi(id);
            } else {
                await blockBidderApi(id);
            }
            setBidders(bidders.map(bidder =>
                bidder._id === id ? { ...bidder, isBlocked: !bidder.isBlocked } : bidder
            ));
        } catch (error) {
            console.error('Failed to update bidder status', error);
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredBidders = bidders.filter(bidder =>
        bidder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bidder.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bidder.phone.includes(searchQuery) ||
        bidder.bidderScore.toString().includes(searchQuery)
    );

    return (
        <div className="p-6">
            <h1 className="text-1xl italic mb-4">Bidders List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-black border">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr className='bg-black'>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Email</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Score</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBidders.map(bidder => (
                            <tr key={bidder._id} className='bg-black'>
                                <td className="py-3 px-4 text-sm text-gray-400">{bidder.name}</td>
                                <td className="py-3 px-4 text-sm text-gray-400">{bidder.email}</td>
                                <td className="py-3 px-4 text-sm text-gray-400">{bidder.bidderScore}</td>
                                <td className="py-3 px-4 text-sm text-gray-400">
                                    {bidder.isBlocked ? 'Blocked' : 'Active'}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <button
                                        className={`w-24 py-2 rounded ${bidder.isBlocked ? 'bg-red-950 text-white' : 'bg-green-950 text-white'}`}
                                        onClick={() => toggleBlockBidder(bidder._id, bidder.isBlocked)}
                                    >
                                        {bidder.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BiddersList;
