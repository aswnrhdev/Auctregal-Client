const topSoldItems = [
    {
        id: 1,
        image: 'Untitled design (45).png',
        avatar: 'face12.jpg',
        seller: 'Aswin Ramesh',
        item: 'Ford Model T',
        price: '₹57,00,000.00',
        category: 'Vehicles',
        description: 'A beautifully restored 1927 Ford Model T, showcasing classic automotive design and historical significance. This vintage car features original features, including wooden spoke wheels and a stylish, timeless exterior.',
    },
    {
        id: 2,
        image: 'Untitled design (46).png',
        avatar: 'face9.jpg',
        seller: 'Emily Davis',
        item: 'Rustic Love',
        price: '₹6,08,000.00',
        category: 'Art and Antiques',
        description: 'A beautiful and romantic painting depicting an old couple sharing a tender kiss. This artwork captures the essence of timeless love and affection through its soft colors and intricate details.',
    },
    {
        id: 3,
        image: 'Untitled design (47).png',
        avatar: 'face2.jpg',
        seller: 'John Smith',
        item: 'Rolex Daytona Cosmograph',
        price: '₹3,50,000.00',
        category: 'Jewelry and Watches',
        description: 'A prestigious Rolex Daytona Cosmograph, known for its iconic design and precision. This luxury watch is a rare collectible item featuring a chronograph function and a timeless aesthetic.',
    }
];


const RecentSoldItems = () => {
    return (
        <div className=" flex flex-col pl-20">
            <h2 className="text-white">Our Recent Sold Item and Its Seller</h2>
            <p className='text-white'>We are pleased to present some of our most notable success stories.</p>
            {topSoldItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 bg-black rounded-lg mt-5">
                    <img
                        src={item.image}
                        alt="Item Image"
                        className="w-[300px] h-[200px] object-cover"
                    />
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={item.avatar}
                                alt="Seller Avatar"
                                className="w-12 h-12 object-cover rounded-full border-2 border-[#FFC100]"
                            />
                            <div className="flex flex-col">
                                <p className="text-white font-semibold">{item.seller}</p>
                                <p className="text-[#FFC100] text-lg font-bold">{item.item}</p>
                            </div>
                        </div>
                        <div className="text-white">
                            <h3 className="text-xl font-semibold mb-2">{item.price}</h3>
                            <p className="text-gray-400">{item.category}</p>
                            <p className="text-gray-400 pr-20">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecentSoldItems