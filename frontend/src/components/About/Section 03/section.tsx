'use client'
import React from 'react';

const Section = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-10">
      <div className="flex flex-col h-[500px] border border-gray-300 rounded-lg overflow-hidden">
        <div className="w-full p-4 border-b border-gray-300">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">How to Bid on Auctregal?</h3>
            <p className="text-gray-600 mt-2">
              Auctregal is a platform where you can bid on your desired items and make them yours. First, create an Auctregal account and choose whether you want to participate in an online auction, a live auction, or an offline auction conducted biweekly. Before joining an auction, you must create a token by making a payment of 10% of the base price. If you win the auction, the item is yours; if you fail to bid, the amount is fully refunded to your wallet. So, check out the available auctions and start bidding!
            </p>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">How to Sell on Auctregal?</h3>
            <p className="text-gray-600 mt-2">
              To sell on Auctregal, you must first pay a registration fee of approximately $100 during the seller registration process. Ensure your item is listed under the appropriate category: Art and Antiques, Jewelry and Watches, Vehicles, Wine and Spirits, or Rare Books and Manuscripts. Choose a starting price for your auction, and undergo both virtual and physical verification for your product. Once verified, your product will be listed in the "Upcoming Bids" section. If your item receives a minimum of five interests, it will proceed to the bidding phase. Note that keeping your item at our franchise costs approximately $100 per day. Upon successful bidding and delivery to the buyer, the final sale price minus a 10% commission will be transferred to your designated bank account or Auctregal wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
