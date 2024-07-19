'use client'

const AdminSlidebar = ({ setActiveTab, activeTab }) => {
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        { name: "Dashboard" },
        { name: "BiddersList" },
        { name: "SellersList" },
        { name: "Chat" },
        { name: "OfflineSchedule" },
        { name: "AuctionItem" },
        { name: "TransactionHistory" }
    ];

    return (
        <div className="sidebar w-1/5 min-h-screen bg-zinc-900 text-white border-r border-zinc-800 flex flex-col">
            <div className="sidebar-options flex-1 pt-12 pl-4 md:pl-20 flex flex-col gap-4 mt-12">
                <ul className="space-y-2">
                    {tabs.map((tab) => (
                        <li
                            key={tab.name}
                            className={`cursor-pointer px-2 py-1 rounded italic ${
                                activeTab === tab.name ? 'text-red-500' : ''
                            }`}
                            onClick={() => handleTabClick(tab.name)}
                        >
                            {tab.name.replace(/([A-Z])/g, ' $1').trim()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminSlidebar;
