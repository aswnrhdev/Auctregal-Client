'use client'

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearAdminData } from "@/features/admin/adminSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

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
            <div className="relative bg-white border-b border-gray-200 shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-1xl text-black">
                            <RiAdminLine  className="mr-1 w-5 h-5" />
                            Auctregal Admin
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            className="text-black flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100"
                            onClick={handleLogout}
                        >
                            <span>Logout</span>
                            <AiOutlineLogout  className="w-5 h-5" />
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
                    <div className="md:hidden border-t border-gray-200 shadow-lg">
                        <div className="p-4">
                            <button
                                className="w-full text-left p-2 border-b border-gray-200 hover:bg-gray-100"
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
