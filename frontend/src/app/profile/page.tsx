// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import BidderHeader from '@/components/Bidder Components/Bidder Header/page';
// import ProfileSlidebar from '@/components/Profile/ProfileSlidebar/page';
// import { Footer } from '@/components/Bidder Components/Bidder Footer/page';
// import ProfileDashboard from '@/components/Profile/ProfileDashboard/page';
// import AuctionItem from '@/components/Admin/AuctionItem/page';

// import Chat from '@/components/Admin/Closed Bids Page/page';
// import DashboardContent from '@/components/Admin/DashboardContent/page';
// import OfflineSchedule from '@/components/Admin/OfflineSchedule/page';
// import SellersList from '@/components/Admin/SellersList/page';
// import TransactionHistory from '@/components/Admin/TransactionHistory/page';
// import { BidderAuth } from '@/components/BidderAuth/page';
// import PersonalInformation from '@/components/Profile/Personal Information/page';
// import Address from '@/components/Profile/Address/page';

// const ProfilePage = () => {
//     const router = useRouter();
//     const { id, token } = useSelector((state: RootState) => state.user);

//     const [activeTab, setActiveTab] = useState("Dashboard");
//     const [showAuth, setShowAuth] = useState(false);

//     useEffect(() => {
//         if (!token) {
//         }
//     }, [token, router]);

//     const renderContent = () => {
//         switch (activeTab) {
//             case "Dashboard":
//                 return <ProfileDashboard />;
//             case "Personal Information":  
//                 return <PersonalInformation />;
//             case "Address":
//                 return <Address />;
//             default:
//                 return <ProfileDashboard />;
//         }
//     };

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col">
//             <BidderHeader />
//             <div className="flex-1 flex">
//                 {token ? (
//                     <div className="flex flex-1">
//                         {/* Sidebar */}
//                         <ProfileSlidebar setActiveTab={setActiveTab} activeTab={activeTab} className="w-1/4" />

//                         {/* Content */}
//                         <div className="flex-1 p-4">
//                             {renderContent()}
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex-1 flex items-center justify-center">
//                         <div className="text-center">
//                             <p className="text-xl mb-4">You need to be logged in to access this page.</p>
//                             <p className="text-lg mb-6">Please log in to continue.</p>
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                 onClick={() => setShowAuth(true)}
//                             >
//                                 Go to Login
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <Footer />
//             {showAuth && (
//                 <BidderAuth setShowAuth={setShowAuth} />
//             )}
//         </div>

//     );
// }

// export default ProfilePage;



import { Footer } from '@/components/Bidder Components/Bidder Footer/page'
import BidderHeader from '@/components/Bidder Components/Bidder Header/page'
import Banner from '@/components/Bidder Components/Profile/Banner/page'
import UserInformation from '@/components/Bidder Components/Profile/User Section/page'

const Profile = () => {
    return (
        <>
            <div className='flex flex-col'>
                <BidderHeader />
                <Banner />
                <UserInformation />
                <Footer />
            </div>
        </>
    )
}

export default Profile