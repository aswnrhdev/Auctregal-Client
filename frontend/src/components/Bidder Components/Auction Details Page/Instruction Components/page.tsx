import React from 'react'

const Instruction = () => {
    return (
        <>
            {/* <div className='flex flex-col justify-center text-center pt-10 pl-20 pr-20'>
                <p>Instructions for Bidding</p>
                <p>To participate in bidding, you must first pay 10% of the base price, which is fully refundable within 7 days if you do not win the bid.
                    This payment grants you a bidding token without which bidding cannot proceed.</p>
                <p>After successful payment, the bidding token will be sent to you via email.
                    If you win the bid but fail to complete the payment within 5 hours, your 10% deposit will not be refunded, and the bidding will move to the next highest bidder.</p>
            </div> */}
            <div className="flex justify-center items-center pt-10">
                <div className="text-white font-thin bg-[#603601] p-5 w-[1000px]">
                    <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal italic border-[#1C0A00] border-l-8">
                        <p className="text-center">
                            To participate in bidding, you must first pay 10% of the base price, which is fully refundable within 7 days if you do not win the bid.
                            This payment grants you a bidding token without which bidding cannot proceed. After successful payment, the bidding token will be sent to you via email.
                            If you win the bid but fail to complete the payment within 5 hours, your 10% deposit will not be refunded, and the bidding will move to the next highest bidder.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Instruction