'use client'

import React from 'react';

interface Tab {
  name: string;
}

interface AdminSidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setActiveTab, activeTab }) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs: Tab[] = [
    { name: "Dashboard" },
    { name: "BiddersList" },
    { name: "ClosedBids" },
    { name: "AuctionItem" },
    { name: "Add Item" },
  ];

  return (
    <div className="sidebar w-1/5 min-h-screen bg-[#3C2A21] text-[#E5E5CB] border-r border-[#3C2A21] flex flex-col">
      <div className="sidebar-options flex-1 pt-12 pl-4 md:pl-20 flex flex-col gap-4 mt-12">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`cursor-pointer px-2 py-1 rounded font-thin italic ${
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

export default AdminSidebar;