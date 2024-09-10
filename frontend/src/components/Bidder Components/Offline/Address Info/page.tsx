import React from 'react';
import Image from 'next/image';

const AddressInfo = () => {
  const address = (
    <div>
      <p>Septimum Hall</p>
      <p>13 Auction Avenue</p>
      <p>Malleshwaram, Bangalore, 560055</p>
      <p>India</p>
    </div>
  );

  return (
    <div className="flex justify-between items-center gap-20 pt-10">
      <div className="w-1/2 flex justify-end">
        <div className="relative group">
          <div className="relative h-[150px] w-[300px] rounded-lg overflow-hidden">
            <Image
              src="/top-view-beautiful-natural-landscape.jpg"
              alt="Placeholder"
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-50"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <span className="text-white bg-opacity-50 p-2 rounded">Click for Directions</span>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-start">
        {address}
      </div>
    </div>
  );
}

export default AddressInfo;
