// import React from 'react'
// import Instruction from '../Instruction Components/page';
// import { Elements } from '@stripe/react-stripe-js';
// import BiddingForm from '../Bid Place Components/page';
// import Chatbot from '../Chat Components/page';
// import BiddingPaymentForm from '../Token Payment Form/page';

// const renderCurrentBidding = () => (
//     <>
//         <div className="flex flex-row justify-between pr-20 pl-20 pt-10">
//             <div>
//                 <p className="mt-2">Current bid amount for the item</p>
//                 <p className="text-4xl font-black">{formatPrice(currentPrice)}</p>
//             </div>
//             <div className="items-end">
//                 <p>Remaining time for bidding on the item</p>
//                 <p className="text-lg mt-2"><span className="text-4xl font-black text-red-500">{timeLeft}</span></p>
//             </div>
//         </div>

//         <div className="flex flex-col items-center pt-8">
//             <p className="text-7xl font-black">{item.category === 'Vehicles' ? item.make + " " + item.model : (item.category === 'Wine and Spirits' ? item.name : item.title)}</p>
//             <p className="pl-20 pr-20 text-center mb-5">{item.description}</p>
//             <p>{item.category}</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pl-20 pr-20">
//             <div>
//                 <img src={item.primaryImage} alt={item.title} className="w-[630px] h-[450px] rounded-lg shadow-lg" />
//                 <div className="flex gap-20 mt-6">
//                     {item.secondaryImages?.map((image, index) => (
//                         <img
//                             key={index}
//                             src={image}
//                             alt={`Secondary ${index}`}
//                             className="w-[150px] h-[100px] object-cover cursor-pointer mr-2 mb-2 rounded-lg"
//                         />
//                     ))}
//                 </div>
//             </div>
//             <div className="flex flex-col items-start">
//                 <h2 className="text-2xl font-semibold mb-4">Item Overview</h2>
//                 <table className="w-full text-left">
//                     <tbody>
//                         {renderFields()}
//                         Current Price: {formatPrice(currentPrice)}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//         <Instruction />

//         <div className="mt-10 px-20">
//             <h3 className="text-2xl font-semibold mb-4">Top Bidders</h3>
//             <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="border border-gray-300 px-4 py-2">Rank</th>
//                         <th className="border border-gray-300 px-4 py-2">Name</th>
//                         <th className="border border-gray-300 px-4 py-2">Bid Amount</th>
//                         <th className="border border-gray-300 px-4 py-2">Bid Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {item.bidders
//                         .sort((a, b) => b.bidAmount - a.bidAmount)
//                         .slice(0, 3)
//                         .map((bidder, index) => (
//                             <tr key={bidder.userId}>
//                                 <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{bidder.name}</td>
//                                 <td className="border border-gray-300 px-4 py-2">{formatPrice(bidder.bidAmount)}</td>
//                                 <td className="border border-gray-300 px-4 py-2">
//                                     {new Date(bidder.bidTime).toLocaleString()}
//                                 </td>
//                             </tr>
//                         ))}
//                 </tbody>
//             </table>
//         </div>


//         <div className="mt-10 px-20 flex flex-col items-center">
//             <h3 className="text-2xl font-semibold mb-4">Generate Bidding Token</h3>
//             {!biddingToken ? (
//                 <>
//                     <form onSubmit={handleGenerateToken} className="mb-4">
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                             className="px-3 py-2 border rounded mr-2 text-black"
//                         />
//                         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none">
//                             Generate Token
//                         </button>
//                     </form>

//                     {clientSecret && (
//                         <div>
//                             <h4 className="text-xl font-semibold mb-2 w-[670px] text-center">Make Payment</h4>
//                             <p className="text-lg mb-2 text-center">Amount: {formatPrice(tokenAmount)}</p>
//                             <Elements stripe={stripePromise}>
//                                 <BiddingPaymentForm
//                                     clientSecret={clientSecret}
//                                     email={email}
//                                     onPaymentBiddingSuccess={handleBiddingPaymentSuccess}
//                                 />
//                             </Elements>
//                         </div>
//                     )}
//                 </>
//             ) : (
//                 <p className="text-green-500">Bidding Token: {biddingToken}</p>
//             )}
//         </div>

//         <p className='text-center mt-10'>Current Price: {formatPrice(currentPrice)}</p>
//         <BiddingForm
//             itemId={item._id}
//             basePrice={item.basePrice}
//             currentPrice={currentPrice}
//             onBidPlaced={handleBidPlaced}
//         />
//         <Chatbot item={item} />
//     </>
// );

// export default renderCurrentBidding