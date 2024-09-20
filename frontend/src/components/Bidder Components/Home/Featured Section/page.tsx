// 'use client';

// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import Image from 'next/image';

// interface Item {
//     _id: string;
//     title?: string;
//     make?: string;
//     model?: string;
//     name?: string;
//     category: string;
//     basePrice: number;
//     currentStatus: string;
//     primaryImage: string;
//     description: string;
// }

// export function FeaturedAuction() {

//     const [items, setItems] = useState<Item[]>([]);

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
//             }
//         };

//         fetchItems();
//     }, []);

//     const settings = {
//         infinite: true,
//         speed: 3000,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 0,
//         cssEase: 'linear',
//         centerMode: true,
//         centerPadding: '0',
//         arrows: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 1,
//                 }
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 1,
//                 }
//             },
//         ],
//     };

//     return (
//         <>
//             <div className='bg-[#3C3633] pt-10 pb-20'>
//                 <div className=" max-w-[90%] mx-auto">
//                     <h1 className='text-4xl font-thin text-center'>
//                         Current Auction
//                     </h1>
//                     <p className='text-center font-thin mb-10'>Here is a selection of our current auction items</p>
//                     <Slider {...settings}>
//                         {items.map((item) => (
//                             <div key={item._id} className="relative flex items-center justify-center cursor-pointer px-2">
//                                 <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg">
//                                     <Image
//                                         src={item.primaryImage}
//                                         alt={item.title || item.name || item.make || ''}
//                                         layout="fill"
//                                         objectFit="cover"
//                                         className="transition-opacity duration-500 ease-in-out"
//                                     />
//                                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
//                                         <h2 className="text-xl font-thin mb-2">
//                                             {item.name || item.title || `${item.make} ${item.model}`}
//                                         </h2>

//                                         <p className="font-thin mb-2">{item.description}</p>
//                                         <p className="font-thin">{item.category}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             </div>
//         </>
//     );
// }



'use client';

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

interface Item {
    _id: string;
    title?: string;
    make?: string;
    model?: string;
    name?: string;
    category: string;
    basePrice: number;
    currentStatus: string;
    primaryImage: string;
    description: string;
}

export function FeaturedAuction() {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log('Fetching items...');
                const response = await fetch('https://auctregal.rudopedia.shop/items/bidding');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    // const cleanImageUrl = (url: string) => {
    //     const s3Prefix = 'https://auctregal.s3.eu-north-1.amazonaws.com/';
    //     if (url.startsWith(s3Prefix + s3Prefix)) {
    //         return url.replace(s3Prefix + s3Prefix, s3Prefix);
    //     }
    //     return url;
    // };


    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        centerMode: true,
        centerPadding: '0',
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
        ],
    };

    return (
        <>
            <div className='bg-[#361500] pt-10 pb-20'>
                <div className="max-w-[90%] mx-auto">
                    <h1 className='text-3xl sm:text-4xl font-thin text-center text-[#EEEDEB]'>
                        Current Auction
                    </h1>
                    <p className='text-center font-thin mb-10 text-[#EEEDEB] text-sm sm:text-base'>
                        Here is a selection of our current auction items
                    </p>
                    <Slider {...settings}>
                        {items.map((item) => (
                            <div key={item._id} className="relative flex items-center justify-center cursor-pointer px-2">
                                <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={item.primaryImage}
                                        alt={item.title || item.name || item.make || ''}
                                        width={2048}
                                        height={1536}
                                        style={{ objectFit: 'cover' }} // Optional styling
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
                                        <h2 className="text-lg sm:text-xl font-thin mb-2">
                                            {item.name || item.title || `${item.make} ${item.model}`}
                                        </h2>

                                        <p className="font-thin text-xs sm:text-base mb-2">{item.description}</p>
                                        <p className="font-thin text-xs sm:text-base">{item.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}
