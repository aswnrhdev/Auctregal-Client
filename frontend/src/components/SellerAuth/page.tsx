// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { z } from 'zod';
// import Cookies from 'js-cookie';
// import { resendOtpApi, signupApi, verifyLoginApi, verifyOtpApi } from '@/api/sellerApi';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { setSeller, setSellerData, setVerified } from '@/features/seller/sellerSlice';


// const loginSchema = z.object({
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
// });

// const signUpSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must be digits only"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//     confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
// }).refine(data => data.password === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
// });

// interface SellerAuthProps {
//     setShowAuth: (show: boolean) => void;
// }

// export const SellerAuth = ({ setShowAuth }: SellerAuthProps) => {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [isSignUp, setIsSignUp] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//         otp: ''
//     });
//     const [errors, setErrors] = useState<string | null>(null);
//     const [showOtpForm, setShowOtpForm] = useState(false);
//     const [timer, setTimer] = useState(120);
//     const [canResend, setCanResend] = useState(false);

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (token) {
//             dispatch(setVerified({ verified: true }));
//         }

//         let interval: NodeJS.Timeout | null = null;
//         if (showOtpForm && timer > 0) {
//             interval = setInterval(() => setTimer(t => t - 1), 1000);
//         } else if (timer === 0) {
//             setCanResend(true);
//         }
//         return () => {
//             if (interval) clearInterval(interval);
//         };
//     }, [showOtpForm, timer, dispatch]);

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleLogin = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const { email, password } = formData;

//         try {
//             loginSchema.parse({ email, password });

//             const response = await verifyLoginApi({ email, password });
//             const { token, user } = response.data;
//             console.log(user);

//             Cookies.set('token', token, {
//                 expires: 1,
//                 path: '/seller',
//                 sameSite: 'Lax',
//             });

//             dispatch(setSellerData({
//                 name: user.name,
//                 email: user.email,
//                 phone: user.phone,
//                 verified: user.verified
//             }));
//             dispatch(setVerified({ verified: true }));

//             setShowAuth(false);
//             router.push('/seller');
//             setErrors(null);
//         } catch (error: any) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 setErrors(error.response.data.message);
//             } else if (error instanceof z.ZodError) {
//                 setErrors(error.errors.map(e => e.message).join(", "));
//             } else {
//                 setErrors("An unexpected error occurred. Please try again.");
//             }
//         }
//     };

//     const handleSignUp = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const { name, phone, email, password, confirmPassword } = formData;

//         try {
//             signUpSchema.parse({ name, phone, email, password, confirmPassword });
//             await signupApi({ name, phone, email, password, confirmPassword, otp: '' });

//             dispatch(setSeller({ name, email, phone, password }));

//             setErrors(null);
//             setShowOtpForm(true);
//             setTimer(120);
//             setCanResend(false);
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 setErrors(error.errors.map(e => e.message).join(", "));
//             }
//         }
//     };

//     // const handleOtpSubmit = async (event: React.FormEvent) => {
//     //     event.preventDefault();
//     //     const { otp, email } = formData;

//     //     try {
//     //         await verifyOtpApi({ otp, email });

//     //         setShowOtpForm(false);
//     //         setErrors(null);
//     //         setIsSignUp(false);  // Switch to Login Form after successful OTP
//     //     } catch (error) {
//     //         setErrors("Invalid OTP or OTP has expired.");
//     //     }
//     // };

//     // const handleResendOtp = async () => {
//     //     try {
//     //         await axios.post('/resend-otp', { email: formData.email });
//     //         setTimer(120);
//     //         setCanResend(false);
//     //     } catch (error) {
//     //         console.error("Error resending OTP", error);
//     //     }
//     // };

//     const handleOtpSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const { otp, email } = formData;

//         try {
//             await verifyOtpApi({ otp, email });
//             setShowOtpForm(false);
//             setErrors(null);
//             setIsSignUp(false);  // Switch to Login Form after successful OTP
//         } catch (error) {
//             setErrors("Invalid OTP or OTP has expired.");
//         }
//     };

//     const handleResendOtp = async () => {
//         try {
//             await resendOtpApi(formData.email);
//             setTimer(60);  // Reset the timer to 1 minute for the new OTP
//             setCanResend(false);
//         } catch (error) {
//             console.error("Error resending OTP", error);
//         }
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//             <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm relative">
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-bold text-white">{
//                         showOtpForm ? 'Enter OTP' :
//                             isSignUp ? 'Sign Up' :
//                                 'Login'
//                     }</h2>
//                     <button
//                         onClick={() => setShowAuth(false)}
//                         className="text-gray-500 hover:text-gray-700 p-1"
//                         aria-label="Close"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         >
//                             <path d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>
//                 {showOtpForm ? (
//                     <OtpForm
//                         formData={formData}
//                         handleChange={handleChange}
//                         onSubmit={handleOtpSubmit}
//                         errors={errors}
//                         canResend={canResend}
//                         onResendOtp={handleResendOtp}
//                         timer={timer}
//                     />
//                 ) : isSignUp ? (
//                     <SignUpForm
//                         formData={formData}
//                         handleChange={handleChange}
//                         onSubmit={handleSignUp}
//                         errors={errors}
//                         switchToLogin={() => setIsSignUp(false)}
//                     />
//                 ) : (
//                     <LoginForm
//                         formData={{ email: formData.email, password: formData.password }}
//                         handleChange={handleChange}
//                         onSubmit={handleLogin}
//                         errors={errors}
//                         switchToSignUp={() => setIsSignUp(true)}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };


// const LoginForm = ({ formData, handleChange, onSubmit, errors, switchToSignUp }: { formData: { email: string, password: string }, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: React.FormEvent) => void, errors: string | null, switchToSignUp: () => void }) => (
//     <div className='bg-black text-white p-4 rounded-lg'>
//         <form onSubmit={onSubmit}>
//             <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium">Email</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder='Enter the email'
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Invalid email address") && <p className="text-red-500 text-sm">Invalid email address</p>}
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-medium">Password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder='Enter the password'
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>}
//             </div>
//             {errors && !errors.includes("Invalid email address") && !errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">{errors}</p>}
//             <div className="flex flex-col mt-6 gap-3">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
//                 <div>
//                     <p>Don't have an account?<button type="button" onClick={switchToSignUp} className="text-blue-500 ml-2"> Sign up</button></p>
//                 </div>
//             </div>
//         </form>
//     </div>
// );

// const SignUpForm = ({ formData, handleChange, onSubmit, errors, switchToLogin }: { formData: any, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: React.FormEvent) => void, errors: string | null, switchToLogin: () => void }) => (
//     <div className='bg-black text-white p-4 rounded-lg'>
//         <form onSubmit={onSubmit}>
//             <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium">Name</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder='Enter the name'
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Name is required") && <p className="text-red-500 text-sm">Name is required</p>}
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
//                 <input
//                     type="text"
//                     id="phone"
//                     name="phone"
//                     placeholder='Enter the phone'
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Phone number must be at least 10 digits") && <p className="text-red-500 text-sm">Phone number must be at least 10 digits</p>}
//                 {errors && errors.includes("Phone number must be digits only") && <p className="text-red-500 text-sm">Phone number must be digits only</p>}
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium">Email</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder='Enter the email'
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Invalid email address") && <p className="text-red-500 text-sm">Invalid email address</p>}
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-medium">Password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder='Enter the password'
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>}
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     placeholder='Enter the confirm password'
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
//                 />
//                 {errors && errors.includes("Passwords must match") && <p className="text-red-500 text-sm">Passwords must match</p>}
//             </div>
//             {errors && !errors.includes("Name is required") && !errors.includes("Phone number must be at least 10 digits") && !errors.includes("Phone number must be digits only") && !errors.includes("Invalid email address") && !errors.includes("Password must be at least 6 characters long") && !errors.includes("Passwords must match") && <p className="text-red-500 text-sm">{errors}</p>}
//             <div className="flex flex-col mt-6 gap-3">
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
//                 <div>
//                     <p>Already have an account? <button type="button" onClick={switchToLogin} className="text-blue-500 ml-2">Login</button></p>
//                 </div>
//             </div>
//         </form>
//     </div>
// );


// // const OtpForm = ({ formData, handleChange, onSubmit, errors, canResend, onResendOtp, timer }: { formData: any, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: React.FormEvent) => void, errors: string | null, canResend: boolean, onResendOtp: () => void, timer: number }) => (
// //     <div className='bg-black text-white p-4 rounded-lg'>
// //         <form onSubmit={onSubmit}>
// //             <div className="mb-4">
// //                 <label htmlFor="otp" className="block text-sm font-medium">OTP</label>
// //                 <input
// //                     type="text"
// //                     id="otp"
// //                     name="otp"
// //                     value={formData.otp}
// //                     onChange={handleChange}
// //                     placeholder='Enter the OTP'
// //                     className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
// //                 />
// //             </div>
// //             {errors && <p className="text-red-500 text-sm">{errors}</p>}
// //             <div className="flex justify-between items-center mt-6">
// //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
// //                 {canResend ? (
// //                     <button type="button" onClick={onResendOtp} className="text-blue-500">Resend OTP</button>
// //                 ) : (
// //                     <p className="text-sm text-gray-500">{`Resend OTP in ${timer}s`}</p>
// //                 )}
// //             </div>
// //         </form>
// //     </div>
// // );


// const OtpForm = ({ formData, handleChange, onSubmit, errors, onResendOtp, canResend, timer }: any) => (
//     <form onSubmit={onSubmit} className="space-y-4">
//         <div className="mb-4">
//             <label htmlFor="otp" className="block text-white">Enter OTP</label>
//             <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 value={formData.otp}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 bg-white text-black rounded"
//             />
//         </div>
//         {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Verify OTP</button>
//         <div className="mt-4 text-white flex justify-between items-center">
//             <span>{canResend ? (
//                 <button onClick={onResendOtp} className="text-blue-400 hover:underline">Resend OTP</button>
//             ) : (
//                 `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60}`
//             )}</span>
//         </div>
//     </form>
// );





import { useState, useEffect } from 'react';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { signupApi, verifyLoginApi, verifyOtpApi, resendOtpApi } from '@/api/sellerApi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { setSellerData, setVerified, clearSellerData } from '@/features/seller/sellerSlice';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    // phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must be digits only"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

interface SellerAuthProps {
    setShowAuth: (show: boolean) => void;
}

export const SellerAuth = ({ setShowAuth }: SellerAuthProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [user, setUser] = useState<any>([]);
    const [login, setLogin] = useState<any>([]);
    console.log(user, "user from google");

    const [profile, setProfile] = useState([]);
    console.log(profile, "profile");

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        otp: ''
    });
    const [errors, setErrors] = useState<string | null>(null);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(setVerified({ verified: true }));
        }

        let interval: NodeJS.Timeout | null = null;

        if (showOtpForm && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (timer === 0 && showOtpForm) {
            setCanResend(true);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [showOtpForm, timer, dispatch]);

    useEffect(
        () => {
            if (login) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${login.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${login.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        GoogleSignInData(res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [login]
    );

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        GoogleSignUpData(res.data)
                        // GoogleSignInData(res.data)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const { email, password } = formData;

        try {
            loginSchema.parse({ email, password });

            const response = await verifyLoginApi({ email, password });
            const { user, token } = response.data;

            // Dispatch user data to Redux store
            dispatch(setSellerData({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token,
            }));

            // Set the token and user data in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('sellerData', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: token,
                }));
            }

            dispatch(setVerified({ verified: user.verified }));

            setShowAuth(false);
            router.push('/seller');
            setErrors(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrors(error.response.data.message);
            } else if (error instanceof z.ZodError) {
                setErrors(error.errors.map(e => e.message).join(", "));
            } else {
                setErrors("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        const { name, phone, email, password, confirmPassword } = formData;

        try {
            signUpSchema.parse({ name, phone, email, password, confirmPassword });
            await signupApi({ name, phone, email, password, confirmPassword, otp: '' });

            setShowOtpForm(true);
            setTimer(60);  // Set the timer to 1 minute for OTP expiration
            setCanResend(false);
            setErrors(null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.errors.map(e => e.message).join(", "));
            }
        }
    };

    const handleOtpSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { otp, email } = formData;

        try {
            await verifyOtpApi({ otp, email });
            setShowOtpForm(false);
            setErrors(null);
            setIsSignUp(false);  // Switch to Login Form after successful OTP
        } catch (error) {
            setErrors("Invalid OTP or OTP has expired.");
        }
    };

    const handleResendOtp = async () => {
        try {
            await resendOtpApi(formData.email);
            setTimer(60);  // Reset the timer to 1 minute for the new OTP
            setCanResend(false);
        } catch (error) {
            console.error("Error resending OTP", error);
        }
    };

    const GoogleSignUpData = async (profile: any) => {
        const { email, name, id } = profile;
        try {
            console.log('reached sign up');
            
            await signupApi({ name, phone: '', email, password: id, confirmPassword: id, otp: '', isGoogle: true });
            // router.push('/');
            setErrors(null);
            setIsSignUp(false);
        } catch (error: any) {
            setErrors("An unexpected error occurred. Please try again.");
            console.error("Google Sign-Up Error:", error);
        }
    };

    const handleGoogleSignUp =
        useGoogleLogin({
            onSuccess: (codeResponse: any) => {
                setUser(codeResponse)
            },
            onError: (error) => console.log('Login Failed:', error)
        });


    const GoogleSignInData = async (profile: any) => {
        const { email, id } = profile;
        
        try {
            console.log('reached login');
            

            const response = await verifyLoginApi({ email, password: id });
            const { user, token } = response.data;

            // Dispatch user data to Redux store
            dispatch(setSellerData({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token,
            }));

            // Set the token and user data in localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('sellerData', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: token,
                }));
            }

            dispatch(setVerified({ verified: user.verified }));

            setShowAuth(false);
            router.push('/seller');
            setErrors(null);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrors(error.response.data.message);
            } else if (error instanceof z.ZodError) {
                setErrors(error.errors.map(e => e.message).join(", "));
            } else {
                setErrors("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleGoogleSignIn =
        useGoogleLogin({
            onSuccess: (codeResponse: any) => {
                setLogin(codeResponse)
            },
            onError: (error) => console.log('Login Failed:', error)
        });








    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-sm relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">{
                        showOtpForm ? 'Enter OTP' :
                            isSignUp ? 'Sign Up' :
                                'Login'
                    }</h2>
                    <button
                        onClick={() => setShowAuth(false)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {showOtpForm ? (
                    <OtpForm
                        formData={formData}
                        handleChange={handleChange}
                        onSubmit={handleOtpSubmit}
                        errors={errors}
                        canResend={canResend}
                        onResendOtp={handleResendOtp}
                        timer={timer}
                    />
                ) : isSignUp ? (
                    <SignUpForm
                        formData={formData}
                        handleChange={handleChange}
                        onSubmit={handleSignUp}
                        errors={errors}
                        switchToLogin={() => setIsSignUp(false)}
                        handleGoogleSignUp={handleGoogleSignUp}
                    />
                ) : (
                    <LoginForm
                        formData={{ email: formData.email, password: formData.password }}
                        handleChange={handleChange}
                        onSubmit={handleLogin}
                        errors={errors}
                        switchToSignUp={() => setIsSignUp(true)}
                        handleGoogleSignIn={handleGoogleSignIn}
                    />
                )}
            </div>
        </div>
    );
};

const SignUpForm = ({ formData, handleChange, onSubmit, errors, switchToLogin, handleGoogleSignUp }: { formData: any, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: React.FormEvent) => void, errors: string | null, switchToLogin: () => void, handleGoogleSignUp: () => void }) => (
    <div className='bg-black text-white p-4 rounded-lg'>
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm ">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Enter the name'
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Name is required") && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Enter the email'
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Invalid email address") && <p className="text-red-500 text-sm">Invalid email address</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm ">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter the password'
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Password must be at least 6 characters long") && <p className="text-red-500 text-sm">Password must be at least 6 characters long</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Enter the confirm password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
                {errors && errors.includes("Confirm password must be at least 6 characters long") && <p className="text-red-500 text-sm">Confirm password must be at least 6 characters long</p>}
                {errors && errors.includes("Passwords must match") && <p className="text-red-500 text-sm">Passwords must match</p>}
            </div>
            <div className="mb-4">
                {errors && <p className="text-red-500 text-sm">{errors}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  transition mt-4 mb-2"
            >
                Create account
            </button>
        </form>
        <button
            onClick={handleGoogleSignUp}
            className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-blue-400 hover:text-white transition mt-4 flex justify-center gap-2"
        >
            Sign Up with Google <FcGoogle className='mt-1' />
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account? <button onClick={switchToLogin} className="text-blue-500 hover:cursor-pointer">Login</button>
        </p>
    </div>
);



const LoginForm = ({ formData, handleChange, onSubmit, errors, switchToSignUp, handleGoogleSignIn }: { formData: { email: string, password: string }, handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onSubmit: (event: React.FormEvent) => void, errors: string | null, switchToSignUp: () => void, handleGoogleSignIn: () => void }) => (
    <div className='bg-black text-white p-4 rounded-lg'>
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
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter the password'
                    className="mt-1 block w-full px-3 py-2 bg-white border border-white rounded-md text-black"
                />
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
            Don't have an account? <button onClick={switchToSignUp} className="text-blue-500 hover:cursor-pointer">Sign up</button>
        </p>
    </div>
);



const OtpForm = ({ formData, handleChange, onSubmit, errors, onResendOtp, canResend, timer }: any) => (
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

