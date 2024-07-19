

const Banner = () => {
    return (
        <div className="relative w-full h-screen">
            <img src="businessmen-handshake.jpg" alt="Home Banner" className="w-full h-full object-cover" />
            <div className="absolute top-1/3 left-20 transform -translate-y-1/3 z-10">
                <h1 className=" font-bold tracking-tight text-white text-8xl mb-3"> Ready to <span className="text-[#FFC100]">sell ?</span></h1>

                <p className=" text-white text-xl">
                    Auctregal is a platform where we value your items as much as you do. We stand between sellers and bidders to ensure secure and seamless transactions. <br />Our mission is to provide a trustworthy and efficient auction experience, making sure your unique items find appreciative new owners while you enjoy <br />peace of mind. Join Auctregal today and let us handle the details for you.
                </p>
                <button className="bg-[#FFC100] text-black py-2 px-14 rounded-lg mt-5 ">Sign up as a seller</button>
            </div>
        </div>
    )
}

export default Banner