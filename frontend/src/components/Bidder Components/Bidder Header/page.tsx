


// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/store';
// import { setUserData, clearUserData } from '@/features/user/userSlice';
// import { useRouter, usePathname } from 'next/navigation';
// import { BidderAuth } from '../Auth/Bidder Auth/page';
// import { ImFlattr } from "react-icons/im";
// import { AiOutlineAlibaba } from "react-icons/ai";
// import { CgMonday } from "react-icons/cg";

// const BidderHeader = () => {

//     console.log('Its Header');

//     const router = useRouter();
//     const pathname = usePathname();
//     const [showAuth, setShowAuth] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.user);

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const userData = localStorage.getItem('userData');
//             if (userData) {
//                 const user = JSON.parse(userData);
//                 dispatch(setUserData({
//                     id: user.id,
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,
//                     token: user.token,
//                 }));
//             }
//         }
//     }, [dispatch]);

//     const isSignedIn = user.id;
//     const displayName = user.name || '';

//     useEffect(() => {
//         setDropdownOpen(false);
//     }, [user.id]);

//     const handleLogout = () => {
//         dispatch(clearUserData());
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem('userData');
//         }
//         router.push('/');
//     };

//     const handleNavigation = (path: string) => {
//         router.push(path);
//     };

//     const [showDropdown, setShowDropdown] = useState(false);

//     return (
//         <>
//             {/* Main Navigation */}
//             <div className="top-0 left-0 right-0 bg-[#EEEDEB] border-b border-[#EEEDEB] z-30 pt-2 pb-2 text-[#1C0A00] pl-5 pr-5">
//                 <div className="flex flex-wrap justify-between items-center p-2 px-4">
//                     <div className="flex items-center cursor-pointer space-x-2">
//                         <CgMonday 
//                             className="w-8 h-8 text-[#1C0A00]"
//                             onClick={() => handleNavigation('/')}
//                         />
//                         <p className="text-[#1C0A00] hidden sm:block">Auctregal</p>
//                     </div>

//                     <div className="hidden md:flex gap-5">
//                         <p
//                             className={`cursor-pointer transition-colors duration-300 ease-out 
//                     ${pathname === '/' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
//                     ${pathname === '/' ? '' : 'text-[#1C0A00]'}`}
//                             onClick={() => handleNavigation('/')}
//                         >
//                             Home
//                         </p>
//                         <p
//                             className={`cursor-pointer transition-colors duration-300 ease-out 
//                     ${pathname === '/auction' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
//                     ${pathname === '/auction' ? '' : 'text-[#1C0A00]'}`}
//                             onClick={() => handleNavigation('/auction')}
//                         >
//                             Explore Auctions
//                         </p>
//                         {/* <p
//                             className={`cursor-pointer transition-colors duration-300 ease-out 
//                     ${pathname === '/about' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
//                     ${pathname === '/about' ? '' : 'text-[#1C0A00]'}`}
//                             onClick={() => handleNavigation('/about')}
//                         >
//                             About Us
//                         </p> */}
//                         <p
//                             className={`cursor-pointer transition-colors duration-300 ease-out 
//                     ${pathname === '/profile' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
//                     ${pathname === '/profile' ? '' : 'text-[#1C0A00]'}`}
//                             onClick={() => handleNavigation('/profile')}
//                         >
//                             Profile
//                         </p>
//                     </div>

//                     <div className="flex gap-5 items-center z-30">
//                         {isSignedIn ? (
//                             <div className="relative">
//                                 <button
//                                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                                     className="w-12 h-12 rounded-full overflow-hidden"
//                                 >
//                                     <img
//                                         src="/face15.jpg"
//                                         alt="Profile"
//                                         className="object-cover w-full h-full"
//                                     />
//                                 </button>
//                                 {dropdownOpen && (
//                                     <div className="absolute right-0 mt-2 w-48 bg-[#DCD7C9] text-[#1C0A00] rounded-lg shadow-lg border-b border-t border-[#1C0A00]">
//                                         <div className="p-2 border-b border-[#1C0A00]">
//                                             <span>{displayName}</span>
//                                         </div>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="w-full text-left px-4 py-2 text-red-500"
//                                         >
//                                             Logout
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={() => setShowAuth(true)}
//                                 className="bg-[#1C0A00] text-[#DCD7C9] rounded-3xl px-6 py-2
//                                        hover:bg-[#3F4E4F] hover:text-[#DCD7C9]
//                                        transition-colors duration-300 ease-out"
//                             >
//                                 Sign In
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {showAuth && <BidderAuth setShowAuth={setShowAuth} />}
//         </>
//     );
// }

// export default BidderHeader;



'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUserData, clearUserData } from '@/features/user/userSlice';
import { useRouter, usePathname } from 'next/navigation';
import { BidderAuth } from '../Auth/Bidder Auth/page';
import { CgMonday } from "react-icons/cg";
import Image from 'next/image'; // Import the Image component

const BidderHeader = () => {

    const router = useRouter();
    const pathname = usePathname();
    const [showAuth, setShowAuth] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                dispatch(setUserData({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: user.token,
                }));
            }
        }
    }, [dispatch]);

    const isSignedIn = user.id;
    const displayName = user.name || '';

    useEffect(() => {
        setDropdownOpen(false);
    }, [user.id]);

    const handleLogout = () => {
        dispatch(clearUserData());
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userData');
        }
        router.push('/');
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            {/* Main Navigation */}
            <div className="top-0 left-0 right-0 bg-[#EEEDEB] border-b border-[#EEEDEB] z-30 pt-2 pb-2 text-[#1C0A00] pl-5 pr-5">
                <div className="flex flex-wrap justify-between items-center p-2 px-4">
                    <div className="flex items-center cursor-pointer space-x-2">
                        <CgMonday 
                            className="w-8 h-8 text-[#1C0A00]"
                            onClick={() => handleNavigation('/')}
                        />
                        <p className="text-[#1C0A00] hidden sm:block">Auctregal</p>
                    </div>

                    <div className="hidden md:flex gap-5">
                        <p
                            className={`cursor-pointer transition-colors duration-300 ease-out 
                    ${pathname === '/' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
                    ${pathname === '/' ? '' : 'text-[#1C0A00]'}`}
                            onClick={() => handleNavigation('/')}
                        >
                            Home
                        </p>
                        <p
                            className={`cursor-pointer transition-colors duration-300 ease-out 
                    ${pathname === '/auction' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
                    ${pathname === '/auction' ? '' : 'text-[#1C0A00]'}`}
                            onClick={() => handleNavigation('/auction')}
                        >
                            Explore Auctions
                        </p>
                        <p
                            className={`cursor-pointer transition-colors duration-300 ease-out 
                    ${pathname === '/profile' ? 'border-b-2 border-[#3F4E4F]' : 'hover:text-[#CC9544]'} 
                    ${pathname === '/profile' ? '' : 'text-[#1C0A00]'}`}
                            onClick={() => handleNavigation('/profile')}
                        >
                            Profile
                        </p>
                    </div>

                    <div className="flex gap-5 items-center z-30">
                        {isSignedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-12 h-12 rounded-full overflow-hidden"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/face15.jpg"
                                            alt="Profile"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[#DCD7C9] text-[#1C0A00] rounded-lg shadow-lg border-b border-t border-[#1C0A00]">
                                        <div className="p-2 border-b border-[#1C0A00]">
                                            <span>{displayName}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-500"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuth(true)}
                                className="bg-[#1C0A00] text-[#DCD7C9] rounded-3xl px-6 py-2
                                       hover:bg-[#3F4E4F] hover:text-[#DCD7C9]
                                       transition-colors duration-300 ease-out"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showAuth && <BidderAuth setShowAuth={setShowAuth} />}
        </>
    );
}

export default BidderHeader;
