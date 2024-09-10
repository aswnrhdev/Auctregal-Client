'use client'
import AdminHeader from '@/components/Admin/AdminHeader/page'
import AdminSlidebar from '@/components/Admin/AdminSlidebar/page'
import AuctionItem from '@/components/Admin/AuctionItem/page'
import BiddersList from '@/components/Admin/BiddersList/page'
import ClosedBids from '@/components/Admin/Closed Bids Page/page'
import DashboardContent from '@/components/Admin/DashboardContent/page'
// import OfflineSchedule from '@/components/Admin/OfflineSchedule/page'
// import TransactionHistory from '@/components/Admin/TransactionHistory/page'
import AddItem from '@/components/Admin/Add Item/page'
import withAdminAuth from '@/hoc/Admin/withAdminAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const Page = () => { // Changed from "page" to "Page"
    const router = useRouter()
    const { token } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        if (token) {
            router.push('/admin/dashboard')
        }
    }, [token, router]) // Added "router" to dependency array

    const [activeTab, setActiveTab] = useState("Dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return <DashboardContent />;
            case "BiddersList":
                return <BiddersList />;
            case "ClosedBids":
                return <ClosedBids />;
            case "AuctionItem":
                return <AuctionItem />;
            case "Add Item":
                return <AddItem />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <AdminHeader />
            <div className="flex">
                <AdminSlidebar setActiveTab={setActiveTab} activeTab={activeTab} />
                <div className="flex-1 p-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default withAdminAuth(Page);
