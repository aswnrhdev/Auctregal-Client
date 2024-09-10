import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const LoginForm = ({
    formData,
    handleChange,
    onSubmit,
    errors,
    switchToSignUp,
    handleGoogleSignIn
}: {
    formData: { email: string, password: string },
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (event: React.FormEvent) => void,
    errors: string | null,
    switchToSignUp: () => void,
    handleGoogleSignIn: () => void
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className='bg-[#1C0A00] text-white p-4 rounded-lg'>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter the email'
                        className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                    />
                    {errors && errors.includes("Invalid email address") && <p className="text-red-500 text-sm">Invalid email address</p>}
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-sm">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter the password'
                        className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black pr-10"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                    >
                        {showPassword ? <AiOutlineEyeInvisible className='text-black mt-5' /> : <AiOutlineEye className='text-black mt-5' />}
                    </button>
                    {errors && errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>}
                </div>
                {errors && !errors.includes("Invalid email address") && !errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">{errors}</p>}
                <div className="flex flex-col mt-6 gap-3">
                    <button type="submit" className="bg-blue-500 text-white rounded-md px-10 py-2 mb-2">Login</button>
                </div>
            </form>
            <button
                onClick={handleGoogleSignIn}
                className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-blue-400 hover:text-white transition mt-4 flex justify-center gap-2"
            >
                Sign In with Google <FcGoogle className='mt-1' />
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">
                Don&apos;t have an account? <button onClick={switchToSignUp} className="text-blue-500 hover:cursor-pointer">Sign up</button>
            </p>
        </div>
    );
};
