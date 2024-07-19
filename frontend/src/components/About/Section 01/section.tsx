'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const cardData = [
    {
        title: "Modern Expressionist Artwork Captivates Collectors",
        content: "A contemporary artist’s abstract work captivated collectors, becoming the centerpiece of our recent auction.",
        image: "portrait-smiling-man-front-painting.jpg"
    },
    {
        title: "Antique Vase Fetches Fortune",
        content: "A centuries-old vase with intricate designs fetched an incredible price at Auctregal’s antique auction.",
        image: "antique-vase-with-indigenous-pattern (1).jpg"
    },
    {
        title: "The Fascinating Story Behind a Rare and Exquisite Sculpture",
        content: "A rare sculpture’s story captivated bidders, leading to a spectacular auction result.",
        image: "greek-busts-inside-temple_23-2150719324.jpg"
    },
    {
        title: "Classic 1960s Car Steals the Show with Timeless Elegance and Style",
        content: "A beautifully restored 1960s classic car captured the attention of auto enthusiasts and collectors alike.",
        image: "3d-car-with-simple-background (1).jpg"
    },
    {
        title: "Rediscovered Masterpiece Becomes Auction Star",
        content: "A forgotten painting from the Renaissance era was found in a small attic, bringing it to the limelight in Auctregal’s latest auction.",
        image: "international-kissing-day-celebration-with-couple_23-2151185274.jpg"
    },
    {
        title: "19th Century Wine Collection Achieves High Bids",
        content: "A selection of exquisite wines from the 1800s went under the hammer, offering a taste of history to bidders.",
        image: "elegant-wine-bottle-cup-with-grapes-generative-ai_188544-8088.jpg"
    },
    {
        title: "A Hidden Treasure Unearthed",
        content: "An old coin collection, once forgotten, became a sensation at Auctregal’s auction event.",
        image: "close-up-money-put-aside-savings_23-2151670089.jpg"
    },

]

const Section = () => {
    return (
        <div className="relative">
            <h1 className='mt-10 text-2xl font-bold text-center'>Auctregal Success Stories</h1>
            <p className='text-center mb-10'>Showcasing Achievements that Define Our Prestigious Heritage</p>
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
                                className="absolute inset-0 w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50 text-white z-10">
                                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                                <p className="text-sm">{card.content}</p>
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

export default Section;
