'use client';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { adminLogin } from '@/api/adminApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminData } from '@/features/admin/adminSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { AiOutlineLogin } from "react-icons/ai";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        // Clear previous errors
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
            } catch (error:any) {
                
                const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
                setErrors([errorMessage]);
                console.error('Login failed', error);
            }
        }
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <div className='bg-zinc-950 p-10 rounded-lg mb-4 flex flex-col gap-6'>
                    <h1 className='italic'>Admin Login</h1>
                    <div>
                        <label htmlFor="email" className="flex text-sm mb-2 italic">
                            Enter your email.
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 bg-white border border-white rounded-md text-black italic"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="flex text-sm mb-2 italic">
                            Enter your password.
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 bg-white rounded-lg text-black"
                        />
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
                        className="bg-white text-black py-2 w-full rounded-lg italic flex items-center gap-2 justify-center hover:bg-black hover:text-white"
                    >
                        Login <AiOutlineLogin />
                    </button>
                    
                    
                </div>
            </form>
        </div>
    );
};

export default AdminLoginForm;
