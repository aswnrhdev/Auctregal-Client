'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const categories = {
  "Art and Antiques": [
    "18th Century French Louis XV Style Giltwood Mirror",
    "Original Picasso Lithograph",
    "Ming Dynasty Porcelain Vase",
    "Renaissance Tapestry",
    "Antique Persian Rug",
  ],
  "Jewelry and Watches": [
    "Rolex Submariner 18K Gold Watch",
    "Vintage Cartier Diamond Necklace",
    "Tiffany & Co. Platinum Engagement Ring",
  ],
  "Collectibles": [
    "First Edition of J.K. Rowling's 'Harry Potter and the Philosopher's Stone'",
    "Autographed Michael Jordan Basketball Jersey",
    "1930s Mickey Mouse Tin Toy",
    "Original Star Wars Action Figures Set",
    "Signed Beatles Memorabilia",
  ],
  "Rare Books and Manuscripts": [
    "First Edition of Charles Dickens 'A Tale of Two Cities'",
    "Gutenberg Bible Leaf",
  ],
  "Vehicles": [
    "1967 Ford Mustang Shelby GT500",
    "1957 Chevrolet Bel Air Convertible",
    "1961 Jaguar E-Type Roadster",
  ],
};

const items = [
  { title: "1967 Ford Mustang Shelby GT500", description: "Classic American muscle car, powerful.", basePrice: `59,81,000`, image: "/this-1967-ford-mustang-shelby-gt500-looks-like-it-was-built-yesterday-154718_1.jpg" },
  { title: "First Edition of Charles Dickens A Tale of Two Cities", description: "Early Dickens novel, valuable edition.", basePrice: `12,45,000`, image: "/30305190905.jpg" },
  { title: "Renaissance Tapestry", description: "Beautiful, historic Renaissance tapestry, exquisite.", basePrice: `20,75,000`, image: "/95571.jpg" },
  { title: "Signed Beatles Memorabilia", description: "Rare Beatles items, autographed collectibles.", basePrice: `4,15,000`, image: "/beatles-autographed-hard-days-night.jpg" },
  { title: "Rolex Submariner 18K Gold Watch", description: "Luxurious 18K gold Rolex watch.", basePrice: `16,60,000`, image: "/antique-gold-pocket-watch-timeless-elegance-generated-by-ai.jpg" },
  { title: "1961 Jaguar E-Type Roadster", description: "Iconic 1960s sports car, elegant.", basePrice: `6,64,000`, image: "/144997929.jpg" },
];

const itemsPerPage = 6;

const FeaturedAuction = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className='text-center pt-10 pl-20 pr-20'>
        <p>We are excited to announce a mega auction featuring a diverse selection of categories, including Art and Antiques, Jewelry and Watches, Vehicles, Collectibles, and Rare Books and Manuscripts. This event will showcase a total of 18 exceptional items available for bidding on Septimum. Below, we highlight a few of the featured items. Interested bidders are encouraged to secure their spot by registering through the link provided. For further information, please contact our team at <span className='text-blue-500 cursor-pointer'>auctregal@info</span>.</p>
      </div>

      <div className='overflow-x-auto p-10'>
        <table className='w-full border-collapse border border-gray-300 rounded-lg'>
          <thead>
            <tr>
              {Object.keys(categories).map(category => (
                <th key={category} className='border border-gray-300 p-4 font-normal hover:text-[#CC9544] transition-colors duration-500 cursor-pointer'>{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(categories).map((items, index) => (
                <td key={index} className='border border-gray-300 p-4 align-top'>
                  <ul className='list-disc pl-5'>
                    {items.map((item, i) => (
                      <li key={i} className='pb-1'>{item}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className='pl-10'>
        <h1 className='mb-4'>Auctregal Featured Items</h1>
        <div className='grid grid-cols-3 gap-6'>
          {currentItems.map((item, index) => (
            <div key={index} className='relative p-4 flex flex-col items-center group'>
              <div className='relative w-[450px] h-[200px]'>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className='transition-opacity duration-500 group-hover:opacity-50'
                />
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer'>
                  <div className='flex flex-col items-center'>
                    {/* <span className='bg-opacity-50 p-2 rounded text-center'>{item.description}</span> */}
                    <p className=''>Base price starts from ₹{item.basePrice}</p>
                  </div>
                </div>
              </div>
              <h2 className='mt-3'>{item.title}</h2>
              <span className='bg-opacity-50 p-2 rounded text-center'>{item.description}</span>
            </div>
          ))}
        </div>

        <div className='flex justify-center gap-5 mt-6'>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className='bg-[#603601] text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer hover:bg-[#CC9544] transition-colors duration-500'
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className='bg-[#603601] text-white px-6 py-2 rounded disabled:opacity-50 cursor-pointer hover:bg-[#CC9544] transition-colors duration-500'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAuction;
