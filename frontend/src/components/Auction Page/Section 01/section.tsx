'use client'

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

const Section = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('https://auctregal.rudopedia.shop/items/upcoming');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

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
        <div className='bg-[#361500] pt-10 pb-20'>
            <div className="max-w-[90%] mx-auto">
                <h1 className='text-3xl sm:text-4xl font-thin text-center text-white mb-4'>
                    Upcoming Auction
                </h1>
                <p className='text-center font-thin mb-10 text-gray-300 text-sm sm:text-base'>
                    Get ready to place your bids on our exciting upcoming auctions.
                </p>
                <Slider {...settings}>
                    {items.map((item) => (
                        <div key={item._id} className="relative flex items-center justify-center cursor-pointer px-2">
                            <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={item.primaryImage}
                                    alt={item.title || item.name || item.make || 'Image'}
                                    className="opacity-70"
                                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-thin mb-2">
                                        {item.name || item.title || `${item.make} ${item.model}`}
                                    </h2>
                                    <p className="text-xs sm:text-sm md:text-base font-thin mb-2">
                                        {item.description}
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-base font-thin">{item.category}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="flex justify-center items-center pt-10 px-4">
                <div className="text-white font-thin bg-[#603601] p-5 w-full max-w-[1000px]">
                    <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal italic border-[#1C0A00] border-l-8">
                        <p className="text-center text-sm sm:text-base">
                            In the world of bidding, fortune favors the bold. The key to success is knowing when to raise your hand and when to hold your ground.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section;
