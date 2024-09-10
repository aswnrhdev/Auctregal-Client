import React from 'react'

const GoogleMap = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <div className="text-center mt-5 flex flex-col">
                    <p>Auct Headquarters</p>
                    <p>Mini Bypass Rd, Eranhippalam, Kozhikode, Kerala 673006</p>

                </div>
                <div className="border w-full h-[200px] flex justify-center items-center ">
                    <iframe
                        width="550"
                        height="200"
                        className="w-full"
                        src="https://maps.google.com/maps?width=450&amp;height=200&amp;hl=en&amp;q=Mini%20Bypass%20Rd,%20near%20Sarovaram%20Bio%20Park,%20Eranhippalam,%20Kozhikode,%20Kerala%20673006+(Auct%20Headquarters)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* <div>
                        <button
                            onClick={() => window.open("https://www.google.com/maps/dir/?api=1&destination=Mini%20Bypass%20Rd,%20Eranhippalam,%20Kozhikode,%20Kerala%20673006", "_blank")}
                            className="bg-orange-900 text-white p-2 px-6 rounded-lg hover:bg-black hover:text-white transition-all duration-500"
                        >
                            Get Directions
                        </button>
                    </div> */}
            </div>
        </>
    )
}

export default GoogleMap