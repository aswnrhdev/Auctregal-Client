import React from 'react';

const TokenRegistration = () => {
    return (
        <div className="flex items-center justify-center mt-10 space-x-4 pl-96 pr-96 mb-10">
            <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 rounded-lg bg-[#1C0A00] text-white"
                required
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Generate Token
            </button>
        </div>
    );
};

export default TokenRegistration;
