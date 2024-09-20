// 'use client'

// const Banner = () => {
//     return (
//         <>
//             <>
//                 <div className="bg-[#2C3639] flex justify-center items-center flex-col text-[#DCD7C9] pt-10 pb-10">
//                     <h1 className="text-7xl font-thin">Profile</h1>

//                     <div className="text-center pt-5 pb-5">
//                         <div className="text-white font-thin bg-[#3F4E4F] pl-28 pr-28 pt-5 pb-5 w-[1000px]">


//                             <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal italic border-[#A27B5C] border-l-8">
//                                 <p >Check your bids or update your profile anytime <br />Cheers, The Auctregal Team!</p>
                               
//                             </div>

//                         </div>
//                     </div>

//                 </div>
//             </>
//         </>
//     )
// }

// export default Banner


'use client'

const Banner = () => {
    return (
        <>
            <div className="bg-[#603601] flex justify-center items-center flex-col text-[#DCD7C9] pt-10 pb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin text-center">Profile</h1>

                <div className="text-center pt-5 pb-5 px-4 sm:px-8 w-full">
                    <div className="text-white font-thin bg-[#361500] px-4 sm:px-6 md:px-12 lg:px-28 py-5 w-full max-w-[1000px] mx-auto">

                        <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal italic border-[#A27B5C] border-l-8 mx-4 sm:mx-8">
                            <p className="text-sm sm:text-base">
                                Check your bids or update your profile anytime <br />
                                Cheers, The Auctregal Team!
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;
