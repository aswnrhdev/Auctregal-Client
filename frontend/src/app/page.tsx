import BidderHeader from "@/components/Bidder Components/Bidder Header/page";
import { Banner } from "@/components/Bidder Components/Home/Banner/page";
import { FeaturedAuction } from "@/components/Bidder Components/Home/Featured Section/page";
import { LiveHome } from "@/components/Bidder Components/Home/Live Section/page";
import { OfflineReg } from "@/components/Bidder Components/Home/Offline Section/page";
import { Footer } from "@/components/Bidder Components/Bidder Footer/page";
import HomeTopBar from "@/components/Bidder Components/Home Top Bar/page";
import AboutSection from "@/components/Bidder Components/Home/About Us/page";
import Contact from "@/components/Bidder Components/Home/Contact Form/page";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeTopBar />
      <BidderHeader />
      <Banner />
      <AboutSection />
      <FeaturedAuction />
      {/* <LiveHome /> */}
      {/* <p className="text-white mt-10 font-normal text-center">
        Auctregal ensures you a safe and secure bidding experience. Our platform upholds a legacy of excellence and pride in every auction. <br />
        Check out the item to see more information, start your bidding, and grab the item of your choice. <br />
        Join our community and connect with us on <span className=" cursor-pointer text-blue-600">authregal@info.in</span>
      </p> */}
      <OfflineReg />
      <Contact />
      <Footer />
    </div>
  );
}
