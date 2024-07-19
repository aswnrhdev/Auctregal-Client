import { Banner } from "@/components/Home/Banner/page";
import Header from "@/components/Header/bidderHeader";
import { FeaturedAuction } from "@/components/Home/Featured/page";
import { LiveHome } from "@/components/Home/Live Section/page";
import { OfflineReg } from "@/components/Home/Offline Section/page";
import { Footer } from "@/components/Footer/page";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <Banner />
      <FeaturedAuction />
      <LiveHome />
      <p className="text-white mt-10 font-normal text-center">
        Auctregal ensures you a safe and secure bidding experience. Our platform upholds a legacy of excellence and pride in every auction. <br />
        Check out the item to see more information, start your bidding, and grab the item of your choice. <br />
        Join our community and connect with us on <span className=" cursor-pointer text-blue-600">authregal@info.in</span>
      </p>
      <OfflineReg />
      <Footer />
    </div>
  );
}
