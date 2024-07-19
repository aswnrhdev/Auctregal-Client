import Banner from "@/components/About/Banner/banner"
import Section from "@/components/About/Section 01/section"
import Section2 from "@/components/About/Section 02/section"
import Section3 from "@/components/About/Section 03/section"
import Header from "@/components/Header/bidderHeader"


const page = () => {
  return (
    <div className="flex flex-col">
        <Header />
        <Banner />
        <Section />
        <Section2 />
        
    </div>
  )
}

export default page