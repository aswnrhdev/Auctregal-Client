'use client'
import AdminHeader from '@/components/Admin/AdminHeader/page'
import AdminSlidebar from '@/components/Admin/AdminSlidebar/page'
import AuctionItem from '@/components/Admin/AuctionItem/page'
import BiddersList from '@/components/Admin/BiddersList/page'
import Chat from '@/components/Admin/Chat/page'
import DashboardContent from '@/components/Admin/DashboardContent/page'
import OfflineSchedule from '@/components/Admin/OfflineSchedule/page'
import SellersList from '@/components/Admin/SellersList/page'
import TransactionHistory from '@/components/Admin/TransactionHistory/page'
import withAdminAuth from '@/hoc/Admin/withAdminAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const page = () => {
    const router = useRouter()
    const { token } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        if(token){
            router.push('/admin/dashboard')
        }
    }, [token])

    const [activeTab, setActiveTab] = useState("Dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return <DashboardContent />;
            case "BiddersList":
                return <BiddersList />;
            case "SellersList":
                return <SellersList />;
            case "Chat":
                return <Chat />;
            case "OfflineSchedule":
                return <OfflineSchedule />;
            case "AuctionItem":
                return <AuctionItem />;
            case "TransactionHistory":
                return <TransactionHistory />;
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

export default withAdminAuth(page);
