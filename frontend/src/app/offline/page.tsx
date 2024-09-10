import { Footer } from '@/components/Bidder Components/Bidder Footer/page'
import BidderHeader from '@/components/Bidder Components/Bidder Header/page'
import AddressInfo from '@/components/Bidder Components/Offline/Address Info/page'
import Banner from '@/components/Bidder Components/Offline/Banner/page'
import FeaturedAuction from '@/components/Bidder Components/Offline/Featured Auction/page'
import RegistrationForm from '@/components/Bidder Components/Offline/Registration Form/page'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col'>
            <BidderHeader />
            <Banner />
            <AddressInfo />
            <FeaturedAuction />
            <RegistrationForm />
            <Footer />
        </div>
    )
}

export default page