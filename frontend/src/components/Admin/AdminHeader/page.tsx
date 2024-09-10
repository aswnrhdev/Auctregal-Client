'use client'

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAdminData } from "@/features/admin/adminSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { CgMonday } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const AdminHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        dispatch(clearAdminData());
        router.push('/admin');
    };

    return (
        <>
            <div className="relative bg-[#1A120B] border-b border-[#1A120B] shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center cursor-pointer space-x-2">
                            <CgMonday
                                className="w-8 h-8 text-[#E5E5CB]"
                                
                            />
                            {/* <p className="text-[#E5E5CB] hidden sm:block font-thin">Admin</p> */}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            className="text-[#E5E5CB] flex items-center gap-2 p-2 hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition-colors duration-500 px-6 font-thin"
                            onClick={handleLogout}
                        >
                            <span>Logout</span>
                            <IoIosLogOut className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex md:hidden">
                        <button
                            className="text-black p-2 border rounded-lg"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-[#E5E5CB] shadow-lg">
                        <div className="p-4">
                            <button
                                className="w-full text-left p-2 border-b border-[#E5E5CB] hover:bg-[#E5E5CB] text-[#E5E5CB]"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminHeader;
