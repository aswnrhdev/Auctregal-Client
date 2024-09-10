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