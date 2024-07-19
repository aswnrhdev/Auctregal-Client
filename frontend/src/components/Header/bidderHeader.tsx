'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { BidderAuth } from '../BidderAuth/page';
import { SellerAuth } from '../SellerAuth/page';
import { setUserData, clearUserData } from '@/features/user/userSlice';
import { clearSellerData, setSellerData } from '@/features/seller/sellerSlice';
import { useRouter, usePathname } from 'next/navigation';

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [showAuth, setShowAuth] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const seller = useSelector((state: RootState) => state.seller);

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

            const sellerData = localStorage.getItem('sellerData');
            if (sellerData) {
                const seller = JSON.parse(sellerData);
                dispatch(setSellerData({
                    id: seller.id,
                    name: seller.name,
                    email: seller.email,
                    role: seller.role,
                    token: seller.token,
                }));
            }
        }
    }, [dispatch]);

    const isSignedIn = user.id || seller.id;
    const displayName = user.name || seller.name || '';

    useEffect(() => {
        setDropdownOpen(false);
    }, [user.id, seller.id]);

    const handleLogout = () => {
        dispatch(clearUserData());
        dispatch(clearSellerData());
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userData');
            localStorage.removeItem('sellerData');
        }
        router.push('/');
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <>
            <div className="flex justify-between items-center p-2 px-4 bg-black w-full top-0 left-0 right-0 border-b border-black z-20">
                <div>
                    <h1
                        className="mb-3 text-2xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white cursor-pointer"
                        onClick={() => handleNavigation('/')}
                    >
                        Auct<span className="text-white text-2xl tracking-normal italic">regal</span>
                    </h1>
                </div>
                <div className="text-white flex gap-5">
                    <p
                        className={`cursor-pointer ${pathname === '/' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleNavigation('/')}
                    >
                        Home
                    </p>
                    <p
                        className={`cursor-pointer ${pathname === '/explore' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleNavigation('/explore')}
                    >
                        Explore Auctions
                    </p>
                    <p
                        className={`cursor-pointer ${pathname === '/about' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleNavigation('/about')}
                    >
                        About Us
                    </p>
                    <p
                        className={`cursor-pointer ${pathname === '/seller' ? 'border-b-2 border-white' : ''}`}
                        onClick={() => handleNavigation('/seller')}
                    >
                        Seller
                    </p>
                    <p
                        className={`cursor-pointer ${pathname === '/profile' ? 'border-b-2 border-white' : ''}`}
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
                                <img
                                    src="face15.jpg"
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg">
                                    <div className="p-2 border-b border-gray-200">
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
                            className="bg-white text-black rounded-full px-8 py-2"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
            {showAuth && (
                pathname === '/seller' ? <SellerAuth setShowAuth={setShowAuth} /> : <BidderAuth setShowAuth={setShowAuth} />
            )}
        </>
    );
};

export default Header;
