// import { useState, useEffect } from 'react';
// import { z } from 'zod';
// import Cookies from 'js-cookie';
// import { signupApi, verifyLoginApi, verifyOtpApi, resendOtpApi } from '@/api/bidderApi';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { useGoogleLogin } from '@react-oauth/google';
// import { setUserData, setVerified } from '@/features/user/userSlice';
// import axios from 'axios';
// import { SignUpForm } from '../Bidder Components/Auth/SignUpForm/page';
// import { OtpForm } from '../Bidder Components/Auth/OtpForm/page';
// import { LoginForm } from '../Bidder Components/Auth/LoginForm/page';

// const loginSchema = z.object({
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
// });

// const signUpSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     // phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must be digits only"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
//     confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
// }).refine(data => data.password === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
// });

// interface BidderAuthProps {
//     setShowAuth: (show: boolean) => void;
// }

// export const BidderAuth = ({ setShowAuth }: BidderAuthProps) => {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [user, setUser] = useState<any>([]);
//     const [login, setLogin] = useState<any>([]);
//     console.log(user, "user from google");

//     const [profile, setProfile] = useState([]);
//     console.log(profile, "profile");

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
//     const [timer, setTimer] = useState(0);
//     const [canResend, setCanResend] = useState(false);

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (token) {
//             dispatch(setVerified({ verified: true }));
//         }

//         let interval: NodeJS.Timeout | null = null;

//         if (showOtpForm && timer > 0) {
//             interval = setInterval(() => setTimer(t => t - 1), 1000);
//         } else if (timer === 0 && showOtpForm) {
//             setCanResend(true);
//         }

//         return () => {
//             if (interval) clearInterval(interval);
//         };
//     }, [showOtpForm, timer, dispatch]);

//     useEffect(
//         () => {
//             if (login) {
//                 axios
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${login.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${login.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data);
//                         GoogleSignInData(res.data)
//                     })
//                     .catch((err) => console.log(err));
//             }
//         },
//         [login]
//     );

//     useEffect(
//         () => {
//             if (user) {
//                 axios
//                     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                         headers: {
//                             Authorization: `Bearer ${user.access_token}`,
//                             Accept: 'application/json'
//                         }
//                     })
//                     .then((res) => {
//                         setProfile(res.data);
//                         GoogleSignUpData(res.data)
//                         // GoogleSignInData(res.data)
//                     })
//                     .catch((err) => console.log(err));
//             }
//         },
//         [user]
//     );


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
//             const { user, token } = response.data;

//             dispatch(setUserData({
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 token: token,
//             }));

//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('userData', JSON.stringify({
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,
//                     token: token,
//                 }));
//             }

//             dispatch(setVerified({ verified: user.verified }));

//             setShowAuth(false);
//             router.push('/');
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

//             setShowOtpForm(true);
//             setTimer(60);
//             setCanResend(false);
//             setErrors(null);
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 setErrors(error.errors.map(e => e.message).join(", "));
//             }
//         }
//     };

//     const handleOtpSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const { otp, email } = formData;

//         try {
//             await verifyOtpApi({ otp, email });
//             setShowOtpForm(false);
//             setErrors(null);
//             setIsSignUp(false);
//         } catch (error) {
//             setErrors("Invalid OTP or OTP has expired.");
//         }
//     };

//     const handleResendOtp = async () => {
//         try {
//             await resendOtpApi(formData.email);
//             setTimer(60);
//             setCanResend(false);
//         } catch (error) {
//             console.error("Error resending OTP", error);
//         }
//     };

//     const GoogleSignUpData = async (profile: any) => {
//         const { email, name, id } = profile;
//         try {
//             console.log('reached sign up');

//             await signupApi({ name, phone: '', email, password: id, confirmPassword: id, otp: '', isGoogle: true });
//             // router.push('/');
//             setErrors(null);
//             setIsSignUp(false);
//         } catch (error: any) {
//             setErrors("An unexpected error occurred. Please try again.");
//             console.error("Google Sign-Up Error:", error);
//         }
//     };

//     const handleGoogleSignUp =
//         useGoogleLogin({
//             onSuccess: (codeResponse: any) => {
//                 setUser(codeResponse)
//             },
//             onError: (error) => console.log('Login Failed:', error)
//         });


//     const GoogleSignInData = async (profile: any) => {
//         const { email, id } = profile;

//         try {
//             console.log('reached login');


//             const response = await verifyLoginApi({ email, password: id });
//             const { user, token } = response.data;

//             dispatch(setUserData({
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 token: token,
//             }));

//             if (typeof window !== 'undefined') {
//                 localStorage.setItem('userData', JSON.stringify({
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,
//                     token: token,
//                 }));
//             }

//             dispatch(setVerified({ verified: user.verified }));

//             setShowAuth(false);
//             router.push('/');
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

//     const handleGoogleSignIn =
//         useGoogleLogin({
//             onSuccess: (codeResponse: any) => {
//                 setLogin(codeResponse)
//             },
//             onError: (error) => console.log('Login Failed:', error)
//         });

//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#1C0A00] bg-opacity-50">
//             <div className="bg-[#1C0A00] p-6 rounded-lg shadow-lg w-full max-w-sm relative border border-[#CC9544]">
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
//                         handleGoogleSignUp={handleGoogleSignUp}
//                     />
//                 ) : (
//                     <LoginForm
//                         formData={{ email: formData.email, password: formData.password }}
//                         handleChange={handleChange}
//                         onSubmit={handleLogin}
//                         errors={errors}
//                         switchToSignUp={() => setIsSignUp(true)}
//                         handleGoogleSignIn={handleGoogleSignIn}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

