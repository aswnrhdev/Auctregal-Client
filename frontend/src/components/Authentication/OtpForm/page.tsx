export const OtpForm = ({ formData, handleChange, onSubmit, errors, onResendOtp, canResend, timer }: any) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div className="mb-4">
            <label htmlFor="otp" className="block text-white">Enter OTP</label>
            <input
                id="otp"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white text-black rounded"
            />
        </div>
        {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Verify OTP</button>
        <div className="mt-4 text-white flex justify-between items-center">
            <span>{canResend ? (
                <button onClick={onResendOtp} className="text-blue-400 hover:underline">Resend OTP</button>
            ) : (
                `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60}`
            )}</span>
        </div>
    </form>
);