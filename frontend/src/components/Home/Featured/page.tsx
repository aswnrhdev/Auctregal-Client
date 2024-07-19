'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const cardData = [
    {
        title: "Antique Vase Fetches Fortune",
        category: "Antique",
        price: "₹50,00,000",
        status: "Auction Closed",
        statusColor: "text-gray-500",
        image: "antique-vase-with-indigenous-pattern (1).jpg",
        description: "A centuries-old vase with intricate designs fetched an incredible price at Auctregal’s antique auction. The unique craftsmanship and historical significance attracted high bids from collectors and enthusiasts alike."
    },
    {
        title: "The Fascinating Story Behind a Rare and Exquisite Sculpture",
        category: "Art",
        price: "₹25,00,000",
        status: "Sold",
        statusColor: "text-gray-500",
        image: "greek-busts-inside-temple_23-2150719324.jpg",
        description: "A rare sculpture’s story captivated bidders, leading to a spectacular auction result. The sculpture’s rich history and artistic value made it a standout piece in the auction."
    },
    {
        title: "Classic 1960s Car Steals the Show with Timeless Elegance and Style",
        category: "Vehicle",
        price: "₹35,00,000",
        status: "Currently Bidding",
        statusColor: "text-green-500",
        image: "3d-car-with-simple-background (1).jpg",
        description: "A beautifully restored 1960s classic car captured the attention of auto enthusiasts and collectors alike. Its elegant design and perfect restoration made it a top attraction at the auction."
    },
    {
        title: "Rediscovered Masterpiece Becomes Auction Star",
        category: "Art",
        price: "₹70,00,000",
        status: "Auction Closed",
        statusColor: "text-gray-500",
        image: "international-kissing-day-celebration-with-couple_23-2151185274.jpg",
        description: "A forgotten painting from the Renaissance era was found in a small attic, bringing it to the limelight in Auctregal’s latest auction. The painting’s historical significance and exquisite detail drew high interest from art collectors."
    },
    {
        title: "19th Century Wine Collection Achieves High Bids",
        category: "Collectibles",
        price: "₹15,00,000",
        status: "Sold",
        statusColor: "text-gray-500",
        image: "elegant-wine-bottle-cup-with-grapes-generative-ai_188544-8088.jpg",
        description: "A selection of exquisite wines from the 1800s went under the hammer, offering a taste of history to bidders. The collection’s rarity and historical background led to competitive bidding."
    },
    {
        title: "A Hidden Treasure Unearthed",
        category: "Collectibles",
        price: "₹8,00,000",
        status: "Currently Bidding",
        statusColor: "text-green-500",
        image: "close-up-money-put-aside-savings_23-2151670089.jpg",
        description: "An old coin collection, once forgotten, became a sensation at Auctregal’s auction event. The collection’s historical value and variety attracted many collectors."
    }
];



export function FeaturedAuction() {
    return (
        <div className="relative">
            <h1 className='mt-10 text-2xl font-bold text-start pl-10'>Featured Auction</h1>
            <p className='text-start mb-10 pl-10'>Discover Our Latest Featured Items for Auction</p>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={10}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 5,
                    }
                }}
                className="mySwiper"
            >
                {cardData.map((card, index) => (
                    <SwiperSlide key={index} className="relative flex items-center justify-center">
                        <div className="w-[300px] h-[600px] overflow-hidden rounded-lg shadow-lg relative">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
                                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                                <p className="text-sm mb-2">{card.description}</p>
                                <p className="text-sm mb-2">{card.category}</p>
                                <p className="text-lg font-semibold mb-2">{card.price}</p>
                                <p className={`text-sm ${card.statusColor} mb-2`}>{card.status}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-button-next-custom absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full z-20">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="swiper-button-prev-custom absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full z-20">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
            </Swiper>
        </div>
    )
}
