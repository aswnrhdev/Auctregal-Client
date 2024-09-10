import AuctionBanner from "@/components/Auction Page/Banner/AuctionBanner"
import ClosedBidding from "@/components/Auction Page/Closed Bidding/section"
import { CurrentBidding } from "@/components/Auction Page/Current Bidding/page"
import Section from "@/components/Auction Page/Section 01/section"
import { Footer } from "@/components/Bidder Components/Bidder Footer/page"
import BidderHeader from "@/components/Bidder Components/Bidder Header/page"

const page = () => {
  return (
    <div className="flex flex-col">
      <BidderHeader />
      <AuctionBanner />
      <Section />
      
      <CurrentBidding />
      <ClosedBidding />
      <Footer />
    </div>
  )
}

export default page
