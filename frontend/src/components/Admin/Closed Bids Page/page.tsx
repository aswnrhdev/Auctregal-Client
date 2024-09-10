// 'use client'
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { MdVerified, MdFileDownload } from "react-icons/md";

// interface Slip {
//     _id: string;
//     slipCode: string;
//     qrCode: string;
//     userId: string;
//     itemId: string;
//     userName: string;
//     itemTitle: string;
// }

// interface SlipDetails {
//     slipCode: string;
//     qrCode: string;
//     user: {
//         name: string;
//         email: string;
//     };
//     item: {
//         title: string;
//         category: string;
//         basePrice: number;
//         currentPrice: number;
//         description: string;
//         transactionStatus: string;
//         primaryImage: string;
//         paymentHistory: Array<{ amount: number; paidAt: string }>;
//         bidders: Array<{ name: string; bidAmount: number; bidTime: string }>;
//     };
// }

// const formatIndianRupee = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//         maximumFractionDigits: 0,
//     }).format(amount);
// };

// const ClosedBids = () => {
//     const [slips, setSlips] = useState<Slip[]>([]);
//     const [selectedSlip, setSelectedSlip] = useState<SlipDetails | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
//     const [isRefunded, setIsRefunded] = useState(false);

//     useEffect(() => {
//         const fetchSlips = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/slips');
//                 if (response.ok) {
//                     const data = await response.json();
//                     setSlips(data);
//                 } else {
//                     console.error('Failed to fetch slips');
//                 }
//             } catch (error) {
//                 console.error('Error fetching slips:', error);
//             }
//         };

//         fetchSlips();
//     }, []);

//     const fetchSlipDetails = async (slipId: string) => {
//         try {
//             const response = await fetch(`http://localhost:5000/slips/${slipId}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setSelectedSlip(data);
//                 setIsModalOpen(true);
//             } else {
//                 console.error('Failed to fetch slip details');
//             }
//         } catch (error) {
//             console.error('Error fetching slip details:', error);
//         }
//     };

//     const handleRefund = async () => {
//         if (!selectedSlip) return;

//         try {
//             const response = await fetch(`http://localhost:5000/slips/${selectedSlip.slipCode}/refund`, {
//                 method: 'POST',
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.refundDetails.numberOfBiddersRefunded > 0) {
//                     alert('Refund processed successfully');
//                     setIsRefunded(true);
//                 } else {
//                     alert('There are no other bidders to refund the amount');
//                 }
//                 setIsRefundModalOpen(false);
//                 // Refresh the slip details
//                 await fetchSlipDetails(selectedSlip.slipCode);
//             } else {
//                 const errorData = await response.json();
//                 alert(`Failed to process refund: ${errorData.message}`);
//             }
//         } catch (error) {
//             console.error('Error processing refund:', error);
//             alert('Error processing refund');
//         }
//     };

//     const handleDownloadPDF = async (slipCode: string) => {
//         try {
//             const response = await fetch(`http://localhost:5000/slips/${slipCode}/pdf`, {
//                 method: 'GET',
//             });

//             if (response.ok) {
//                 const blob = await response.blob();
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.style.display = 'none';
//                 a.href = url;
//                 a.download = `slip_${slipCode}.pdf`;
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//             } else {
//                 alert('Failed to download PDF');
//             }
//         } catch (error) {
//             console.error('Error downloading PDF:', error);
//             alert('Error downloading PDF');
//         }
//     };

//     return (
//         <div className="p-6">
//             <div className="overflow-x-auto">
//                 {slips.length === 0 ? (
//                     <p className="text-gray-400">No slips available.</p>
//                 ) : (
//                     <table className="min-w-full bg-white text-black border">
//                         <thead className="bg-gray-100 border-b border-gray-300">
//                             <tr className='bg-black'>
//                                 <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">QR Code</th>
//                                 <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Slip Code</th>
//                                 <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">User Name</th>
//                                 <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Item Title</th>
//                                 <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {slips.map((slip) => (
//                                 <tr key={slip._id} className='bg-black'>
//                                     <td className="py-3 px-4 text-sm text-gray-400">
//                                         <Image src={slip.qrCode} alt="QR Code" width={60} height={60} />
//                                     </td>
//                                     <td className="py-3 px-4 text-sm text-gray-400">{slip.slipCode}</td>
//                                     <td className="py-3 px-4 text-sm text-gray-400">{slip.userName}</td>
//                                     <td className="py-3 px-4 text-sm text-gray-400">{slip.itemTitle}</td>
//                                     <td className="py-3 px-4 text-sm text-gray-400">
//                                         <button
//                                             className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
//                                             onClick={() => fetchSlipDetails(slip._id)}
//                                         >
//                                             More Info
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>

//             {isModalOpen && selectedSlip && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
//                         <h2 className="text-lg font-semibold mb-4">Slip Details</h2>
//                         <div className="grid gap-4 py-4">
//                             <div>
//                                 <strong>User:</strong>
//                                 <p>{selectedSlip.user.name}</p>
//                                 <p>{selectedSlip.user.email}</p>
//                             </div>
//                             <div>
//                                 <strong>Item:</strong>
//                                 <p>Title: {selectedSlip.item.title}</p>
//                                 <p>Category: {selectedSlip.item.category}</p>
//                                 <p>Base Price: {formatIndianRupee(selectedSlip.item.basePrice)}</p>
//                                 <p>Current Price: {formatIndianRupee(selectedSlip.item.currentPrice)}</p>
//                                 <p>Description: {selectedSlip.item.description}</p>
//                                 <p>Transaction Status: {selectedSlip.item.transactionStatus}</p>
//                             </div>
//                             <div>
//                                 <strong>Payment History:</strong>
//                                 {selectedSlip.item.paymentHistory.map((payment, index) => (
//                                     <p key={index}>Amount: {formatIndianRupee(payment.amount)}, Paid at: {new Date(payment.paidAt).toLocaleString()}</p>
//                                 ))}
//                             </div>
//                             <div>
//                                 <strong>Bidders:</strong>
//                                 {selectedSlip.item.bidders.map((bidder, index) => (
//                                     <p key={index}>
//                                         Name: {bidder.name}, Bid: {formatIndianRupee(bidder.bidAmount)},
//                                         Time: {new Date(bidder.bidTime).toLocaleString()}
//                                         {bidder.refunded && (
//                                             <span className="ml-2 text-green-500 flex items-center">
//                                                 <MdVerified size={16} className="mr-1" /> Refunded
//                                             </span>
//                                         )}
//                                     </p>
//                                 ))}
//                             </div>
//                         </div>
//                         <button
//                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                             onClick={() => handleDownloadPDF(selectedSlip.slipCode)}
//                         >
//                             Download PDF
//                         </button>
//                         <button
//                             className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 ${isRefunded ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             onClick={() => setIsRefundModalOpen(true)}
//                             disabled={isRefunded}
//                         >
//                             Refund
//                         </button>
//                         <button
//                             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                             onClick={() => setIsModalOpen(false)}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {isRefundModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
//                         <h2 className="text-lg font-semibold mb-4">Confirm Refund</h2>
//                         <p>
//                             Are you sure you want to transfer 10% of the base price to the failed bidders?
//                         </p>
//                         <div className="mt-4 flex justify-end">
//                             <button
//                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
//                                 onClick={handleRefund}
//                             >
//                                 Transfer
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
//                                 onClick={() => setIsRefundModalOpen(false)}
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClosedBids;


'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdVerified } from "react-icons/md";

interface Slip {
    _id: string;
    slipCode: string;
    qrCode: string;
    userId: string;
    itemId: string;
    userName: string;
    itemTitle: string;
}

interface SlipDetails {
    slipCode: string;
    qrCode: string;
    user: {
        name: string;
        email: string;
    };
    item: {
        title: string;
        category: string;
        basePrice: number;
        currentPrice: number;
        description: string;
        transactionStatus: string;
        primaryImage: string;
        paymentHistory: Array<{ amount: number; paidAt: string }>;
        bidders: Array<{ name: string; bidAmount: number; bidTime: string; refunded?: boolean }>;
    };
}

const formatIndianRupee = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

const ClosedBids: React.FC = () => {
    const [slips, setSlips] = useState<Slip[]>([]);
    const [selectedSlip, setSelectedSlip] = useState<SlipDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [isRefunded, setIsRefunded] = useState(false);

    useEffect(() => {
        const fetchSlips = async () => {
            try {
                const response = await fetch('http://localhost:5000/slips');
                if (response.ok) {
                    const data = await response.json();
                    setSlips(data);
                } else {
                    console.error('Failed to fetch slips');
                }
            } catch (error) {
                console.error('Error fetching slips:', error);
            }
        };

        fetchSlips();
    }, []);

    const fetchSlipDetails = async (slipId: string) => {
        try {
            const response = await fetch(`http://localhost:5000/slips/${slipId}`);
            if (response.ok) {
                const data: SlipDetails = await response.json();
                setSelectedSlip(data);
                setIsModalOpen(true);
            } else {
                console.error('Failed to fetch slip details');
            }
        } catch (error) {
            console.error('Error fetching slip details:', error);
        }
    };

    const handleRefund = async () => {
        if (!selectedSlip) return;

        try {
            const response = await fetch(`http://localhost:5000/slips/${selectedSlip.slipCode}/refund`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                if (data.refundDetails.numberOfBiddersRefunded > 0) {
                    alert('Refund processed successfully');
                    setIsRefunded(true);
                } else {
                    alert('There are no other bidders to refund the amount');
                }
                setIsRefundModalOpen(false);
                // Refresh the slip details
                await fetchSlipDetails(selectedSlip.slipCode);
            } else {
                const errorData = await response.json();
                alert(`Failed to process refund: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error processing refund:', error);
            alert('Error processing refund');
        }
    };

    const handleDownloadPDF = async (slipCode: string) => {
        try {
            const response = await fetch(`http://localhost:5000/slips/${slipCode}/pdf`, {
                method: 'GET',
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `slip_${slipCode}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                alert('Failed to download PDF');
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Error downloading PDF');
        }
    };

    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                {slips.length === 0 ? (
                    <p className="text-gray-400">No slips available.</p>
                ) : (
                    <table className="min-w-full bg-white text-black border">
                        <thead className="bg-gray-100 border-b border-gray-300">
                            <tr className='bg-black'>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">QR Code</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Slip Code</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">User Name</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Item Title</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slips.map((slip) => (
                                <tr key={slip._id} className='bg-black'>
                                    <td className="py-3 px-4 text-sm text-gray-400">
                                        <Image src={slip.qrCode} alt="QR Code" width={60} height={60} />
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-400">{slip.slipCode}</td>
                                    <td className="py-3 px-4 text-sm text-gray-400">{slip.userName}</td>
                                    <td className="py-3 px-4 text-sm text-gray-400">{slip.itemTitle}</td>
                                    <td className="py-3 px-4 text-sm text-gray-400">
                                        <button
                                            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
                                            onClick={() => fetchSlipDetails(slip._id)}
                                        >
                                            More Info
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && selectedSlip && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
                        <h2 className="text-lg font-semibold mb-4">Slip Details</h2>
                        <div className="grid gap-4 py-4">
                            <div>
                                <strong>User:</strong>
                                <p>{selectedSlip.user.name}</p>
                                <p>{selectedSlip.user.email}</p>
                            </div>
                            <div>
                                <strong>Item:</strong>
                                <p>Title: {selectedSlip.item.title}</p>
                                <p>Category: {selectedSlip.item.category}</p>
                                <p>Base Price: {formatIndianRupee(selectedSlip.item.basePrice)}</p>
                                <p>Current Price: {formatIndianRupee(selectedSlip.item.currentPrice)}</p>
                                <p>Description: {selectedSlip.item.description}</p>
                                <p>Transaction Status: {selectedSlip.item.transactionStatus}</p>
                            </div>
                            <div>
                                <strong>Payment History:</strong>
                                {selectedSlip.item.paymentHistory.map((payment, index) => (
                                    <p key={index}>Amount: {formatIndianRupee(payment.amount)}, Paid at: {new Date(payment.paidAt).toLocaleString()}</p>
                                ))}
                            </div>
                            <div>
                                <strong>Bidders:</strong>
                                {selectedSlip.item.bidders.map((bidder, index) => (
                                    <p key={index}>
                                        Name: {bidder.name}, Bid: {formatIndianRupee(bidder.bidAmount)},
                                        Time: {new Date(bidder.bidTime).toLocaleString()}
                                        {bidder.refunded && (
                                            <span className="ml-2 text-green-500 flex items-center">
                                                <MdVerified size={16} className="mr-1" /> Refunded
                                            </span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                            onClick={() => handleDownloadPDF(selectedSlip.slipCode)}
                        >
                            Download PDF
                        </button>
                        <button
                            className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 ${isRefunded ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => setIsRefundModalOpen(true)}
                            disabled={isRefunded}
                        >
                            Refund
                        </button>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isRefundModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
                        <h2 className="text-lg font-semibold mb-4">Confirm Refund</h2>
                        <p>
                            Are you sure you want to transfer 10% of the base price to the failed bidders?
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                                onClick={handleRefund}
                            >
                                Transfer
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                onClick={() => setIsRefundModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClosedBids;