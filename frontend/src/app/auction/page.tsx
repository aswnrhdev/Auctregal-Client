// 'use client'
// import { useState, useEffect } from 'react'
// import AuctionBanner from "@/components/Auction Page/Banner/AuctionBanner"
// import ClosedBidding from "@/components/Auction Page/Closed Bidding/section"
// import { CurrentBidding } from "@/components/Auction Page/Current Bidding/page"
// import Section from "@/components/Auction Page/Section 01/section"
// import { Footer } from "@/components/Bidder Components/Bidder Footer/page"
// import BidderHeader from "@/components/Bidder Components/Bidder Header/page"

// const Page = () => {
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     Promise.all([
//       fetch('http://localhost:5000/items/upcoming').then(res => res.json()),
//       fetch('http://localhost:5000/items/bidding').then(res => res.json()),
//       fetch('http://localhost:5000/items/closed').then(res => res.json())
//     ]).then(() => {
//       setLoading(false)
//     }).catch(error => {
//       console.error('Error fetching data:', error)
//       setLoading(false)
//     })
//   }, [])

//   return (
//     <div className="flex flex-col min-h-screen">
//       <BidderHeader />
//       <AuctionBanner />
//       {loading ? (
//         <div className="flex-grow flex items-center justify-center bg-[#361500]">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
//         </div>
//       ) : (
//         <>
//           <Section />
//           <CurrentBidding />
//           <ClosedBidding />
//         </>
//       )}
//       <Footer />
//     </div>
//   )
// }

// export default Page



'use client'
import { useState, useEffect } from 'react'
import AuctionBanner from "@/components/Auction Page/Banner/AuctionBanner"
import ClosedBidding from "@/components/Auction Page/Closed Bidding/section"
import { CurrentBidding } from "@/components/Auction Page/Current Bidding/page"
import Section from "@/components/Auction Page/Section 01/section"
import { Footer } from "@/components/Bidder Components/Bidder Footer/page"
import BidderHeader from "@/components/Bidder Components/Bidder Header/page"

const Page = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/items/upcoming').then(res => res.json()),
      fetch('http://localhost:5000/items/bidding').then(res => res.json()),
      fetch('http://localhost:5000/items/closed').then(res => res.json())
    ]).then(() => {
      setLoading(false)
    }).catch(error => {
      console.error('Error fetching data:', error)
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <BidderHeader />
      <AuctionBanner />
      {loading ? (
        <div className="flex-grow flex items-center justify-center bg-[#361500]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          <Section />
          <CurrentBidding />
          <ClosedBidding />
        </>
      )}
      <Footer />
    </div>
  )
}

export default Page