'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { adminLogin } from '@/api/adminApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminData } from '@/features/admin/adminSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const adminToken = useSelector((state: RootState) => state.admin.token);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (adminToken) {
            router.push('/admin/dashboard');
        }
    }, [adminToken, router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors([]);

        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const newErrors: string[] = [];
            result.error.errors.forEach((err) => {
                if (err.path.includes('email')) {
                    newErrors.push(err.message);
                }
                if (err.path.includes('password')) {
                    newErrors.push(err.message);
                }
            });
            setErrors(newErrors);
        } else {
            try {
                const { admin } = await adminLogin(email, password);
                dispatch(setAdminData(admin));
                router.push('/admin/dashboard');
            } catch (error: any) {

                const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
                setErrors([errorMessage]);
                console.error('Login failed', error);
            }
        }
    };

    const handleHomeLink = () => {
        router.push('/')
    }

    return (
        <div className="w-full ">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center'>
                    <h1 className='text-5xl font-thin'>Admin Login</h1>
                    <div className="flex justify-center items-center pt-3">
                        <div className="text-white font-thin bg-[#603601] p-5 w-[1000px]">
                            <div className="pt-5 pb-5 bg-[#DCD7C9] text-[#3F4E4F] mt-5 font-normal italic border-[#1C0A00] border-l-8">
                                <p className="text-center">
                                    Hey, want to explore the statistics? Please log in to continue or if you’re not an admin, return to the
                                    <span
                                        className='text-blue-500 cursor-pointer ml-1'
                                        onClick={handleHomeLink}
                                    >
                                        home page
                                    </span>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 justify-center items-center mt-5'>
                        <div className='flex flex-col w-[400px] gap-5'>
                            <div>
                                <label htmlFor="email" className="flex text-sm mb-2">
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full p-2 bg-[#603601] rounded-lg text-white py-4 outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm mb-2">
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        value={password}
                                        placeholder='Password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full p-2 bg-[#603601] rounded-lg text-white py-4 outline-none"
                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                                    >
                                        {passwordVisible ? <AiOutlineEyeInvisible className='text-white' /> : <AiOutlineEye className='text-white' />}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {errors.length > 0 && (
                            <div className="text-red-500 text-sm">
                                {errors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-[#DCD7C9] text-black w-[400px] rounded-lg flex items-center gap-2 justify-center hover:bg-black hover:text-white transition-colors duration-500 py-4"
                        >
                            Login
                        </button>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default AdminLoginForm;
