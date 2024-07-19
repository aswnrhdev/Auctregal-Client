'use client'
import React, { useState } from 'react';

const Section = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            name: 'Jane Doe',
            comment: "Auctregal provided an amazing platform to showcase my art pieces. I'm thrilled with the results!",
            image: 'face15.jpg'
        },
        {
            id: 2,
            name: 'Emily Brown',
            comment: "Selling through Auctregal was seamless. Their support team was incredibly helpful throughout the entire process.",
            image: 'face9.jpg'
        },
        {
            id: 3,
            name: 'John Smith',
            comment: "I've auctioned multiple items on Auctregal, and each time, I've been impressed by the platform's efficiency and reach.",
            image: 'face12.jpg'
        },
        {
            id: 4,
            name: 'Michael Johnson',
            comment: "Auctregal helped me sell my antique collection with ease. The response from buyers was phenomenal.",
            image: 'face5.jpg'
        }
    ]);

    return (
        <div className='max-w-2xl mx-auto mt-10 px-10'>
            <h1 className='text-2xl text-center mb-6'>Here’s What Our Sellers Are Saying About Their Experience with Auctregal</h1>
            {comments.map((comment, index) => (
                <div key={comment.id} className={`mb-6 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-12 h-12 rounded-full mr-4 ${index % 2 === 0 ? 'order-first' : 'order-last'}`} style={{ backgroundImage: `url(${comment.image})`, backgroundSize: 'cover' }}></div>
                    <div className='max-w-md rounded-lg p-4 shadow-md text-left'>
                        <h3 className='text-lg font-bold'>{comment.name}</h3>
                        <p className='text-gray-600'>{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Section;
