// 'use client';

// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/store';
// import { SellerAuth } from '@/components/SellerAuth/page';
// import { setSellerData, setVerified, clearSellerData } from '@/features/seller/sellerSlice';
// import { useRouter } from 'next/navigation';

// export const Header = () => {
//     const router = useRouter();
//     const [showAuth, setShowAuth] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.user);

//     useEffect(() => {
//         if (user.id && user.token) {
//             localStorage.setItem('sellerData', JSON.stringify({
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 token: user.token,
//             }));
//         } else {
//             localStorage.removeItem('sellerData');
//         }


//     }, [user]);

//     const sellerData = localStorage.getItem('sellerData');
//     console.log(sellerData);
    

//     useEffect(() => {

//         setDropdownOpen(false);  
//     }, [sellerData]);

//     const handleLogout = () => {
//         dispatch(clearSellerData());
//         router.push('/seller');
//     };

//     const handleHomeRoute = () => {
//         router.push('/');
//     };

//     const handleAboutRoute = () => {
//         router.push('/about');
//     };

//     const handleSellerRoute = () => {
//         router.push('/seller');
//     };

//     return (
//         <>
//             <div className="flex justify-between items-center p-2 px-4 bg-black w-full top-0 left-0 right-0 border-b border-black z-20">
//                 <div>
//                     <h1
//                         className="mb-3 text-2xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-white cursor-pointer"
//                         onClick={handleHomeRoute}
//                     >
//                         Auct<span className="text-white text-2xl tracking-normal italic">regal</span>
//                     </h1>
//                 </div>
//                 <div className="text-white flex gap-5">
//                     <p>Explore Auctions</p>
//                     <p className="cursor-pointer" onClick={handleAboutRoute}>About Us</p>
//                     <p>Profile</p>
//                     <p className="cursor-pointer" onClick={handleSellerRoute}>Sellers Page</p>
//                 </div>
//                 <div className="flex gap-5 items-center">
//                     {sellerData ? (
//                         <div className="relative">
//                             <button
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                                 className="w-12 h-12 rounded-full overflow-hidden"
//                             >
//                                 <img
//                                     src="face15.jpg"
//                                     alt="Profile"
//                                     className="object-cover w-full h-full"
//                                 />
//                             </button>
//                             {dropdownOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 bg-black text-white rounded-lg shadow-lg">
//                                     <div className="p-2 border-b border-gray-200">
//                                         <span>{user.name}</span>
//                                     </div>
//                                     <button
//                                         onClick={handleLogout}
//                                         className="w-full text-left px-4 py-2 text-red-500"
//                                     >
//                                         Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <button
//                             onClick={() => setShowAuth(true)}
//                             className="bg-white text-black rounded-full px-8 py-2"
//                         >
//                             Sign In
//                         </button>
//                     )}
//                 </div>
//             </div>
//             {showAuth && <SellerAuth setShowAuth={setShowAuth} />}
//         </>
//     );
// };

// export default Header;
