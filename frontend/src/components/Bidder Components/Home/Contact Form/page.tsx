'use client'

import axios from 'axios';
import React, { useState } from 'react';
import { MdMarkEmailRead } from 'react-icons/md';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://auctregal.rudopedia.shop/contacts', formData);
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
            
            Swal.fire({
                toast: true,
                position: 'top',
                text: 'Contact form submitted successfully!',
                showConfirmButton: false,
                timer: 2000,
                background: 'black',
                color: 'white',
                customClass: {
                    popup: 'swal-toast',
                    title: 'swal-toast-title'
                }
            });
        } catch (error) {
            let errorMessage = 'An error occurred while submitting the contact form.';
    
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                errorMessage = error.response.data.error;
            }
    
            Swal.fire({
                toast: true,
                position: 'top',
                text: errorMessage,
                showConfirmButton: false,
                timer: 2000,
                background: 'black',
                color: 'white',
                customClass: {
                    popup: 'swal-toast',
                    title: 'swal-toast-title'
                }
            });
        }
    };
    
    return (
        <div className='bg-[#361500] flex items-center justify-center pt-20 pb-20 relative px-5'>
            <div className="w-full max-w-4xl flex flex-col md:flex-row relative z-10 text-white">
                {/* Contact Info */}
                <div className="md:w-1/3 mb-8 md:mb-0 text-left text-[#DCD7C9]">
                    <h1 className="text-6xl font-thin mb-4 flex items-center">
                        Contact <MdMarkEmailRead className="ml-2 h-[1em] w-[1em]" />
                    </h1>
                    <p className="mb-2 font-light">Auctregal</p>
                    <p className="mb-2 font-light">Email: info@auctregal.com</p>
                    <p className="font-light">Phone: 751 038 5123</p>
                </div>

                {/* Contact Form */}
                <div className="md:w-2/3 md:pl-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 font-thin">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 font-thin">
                            <div className="flex-1">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9]"
                                />
                            </div>
                        </div>
                        <div className='font-thin'>
                            <textarea
                                name="message"
                                placeholder="Leave us a message"
                                rows={3}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-b border-[#DCD7C9] py-2 placeholder-[#DCD7C9] focus:outline-none focus:border-[#DCD7C9] resize-none"
                            ></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="border font-thin border-[#DCD7C9] text-[#DCD7C9] px-8 py-2 hover:bg-[#DCD7C9] hover:text-[#2C3639] transition-colors duration-300">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
