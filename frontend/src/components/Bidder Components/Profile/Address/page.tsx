// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/store';
// import { setUserData } from '@/features/user/userSlice';
// import { updateUserAddressApi, addUserAddressApi } from '@/api/bidderApi';

// const Address = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.user);

//     const [isEditing, setIsEditing] = useState(false);
//     const [hasAddress, setHasAddress] = useState(false);
//     const [addressInfo, setAddressInfo] = useState({
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: '',
//     });

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/user/${user.id}`);
//                 const userData = await response.json();
    
//                 if (userData.street || userData.city || userData.state || userData.zipCode || userData.country) {
//                     setHasAddress(true);
//                     setAddressInfo({
//                         street: userData.street || '',
//                         city: userData.city || '',
//                         state: userData.state || '',
//                         zipCode: userData.zipCode || '',
//                         country: userData.country || '',
//                     });
//                 } else {
//                     setHasAddress(false);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch user data:', error);
//             }
//         };
    
//         if (user.id) {
//             fetchUserData();
//         }
//     }, [user.id]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setAddressInfo({ ...addressInfo, [name]: value });
//     };

//     const handleSave = async () => {
//         try {
//             let updatedUserResponse;
//             if (hasAddress) {
//                 updatedUserResponse = await updateUserAddressApi({
//                     id: user.id,
//                     ...addressInfo
//                 });
//             } else {
//                 updatedUserResponse = await addUserAddressApi({
//                     id: user.id,
//                     ...addressInfo
//                 });
//                 setHasAddress(true);
//             }

//             const updatedUser = updatedUserResponse.data;

//             // Update Redux store
//             dispatch(setUserData({
//                 ...user,
//                 ...updatedUser
//             }));

//             setIsEditing(false);
//         } catch (error) {
//             console.error('Failed to update/add address:', error);
//         }
//     };

//     return (
//         <div className="mt-8 text-white rounded-lg shadow-md w-full max-w-3xl p-6 bg-gray-800">
//             <h2 className="text-start mb-4 text-lg font-semibold">
//                 {hasAddress ? "Address Information" : "Add Address"}
//             </h2>
//             <div className="space-y-4">
//                 {Object.entries(addressInfo).map(([key, value]) => (
//                     <div key={key} className="flex flex-col">
//                         <label className="block text-sm font-medium mb-1" htmlFor={key}>
//                             {key.charAt(0).toUpperCase() + key.slice(1)}
//                         </label>
//                         <input
//                             type="text"
//                             id={key}
//                             name={key}
//                             value={value}
//                             onChange={handleInputChange}
//                             readOnly={!isEditing && hasAddress}
//                             className={`w-full px-3 py-2 border rounded-md ${
//                                 isEditing || !hasAddress ? 'border-gray-300 bg-white text-black' : 'border-transparent bg-gray-700 text-white'
//                             }`}
//                         />
//                     </div>
//                 ))}
//                 <button
//                     onClick={() => {
//                         if (isEditing || !hasAddress) {
//                             handleSave();
//                         } else {
//                             setIsEditing(true);
//                         }
//                     }}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white mt-4"
//                 >
//                     {isEditing ? 'Save' : hasAddress ? 'Edit' : 'Add Address'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Address;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUserData } from '@/features/user/userSlice';
import { updateUserAddressApi } from '@/api/bidderApi';

const Address = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [isEditing, setIsEditing] = useState(false);
    const [addressInfo, setAddressInfo] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${user.id}`);
                const userData = await response.json();
    
                setAddressInfo({
                    name: userData.name || '',
                    street: userData.street || '',
                    city: userData.city || '',
                    state: userData.state || '',
                    zipCode: userData.zipCode || '',
                    country: userData.country || '',
                });
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
    
        if (user.id) {
            fetchUserData();
        }
    }, [user.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const updatedUserResponse = await updateUserAddressApi({
                id: user.id,
                ...addressInfo
            });

            const updatedUser = updatedUserResponse.data;

            // Update Redux store
            dispatch(setUserData({
                ...user,
                ...updatedUser
            }));

            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update address:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to the original values
        setAddressInfo({
            name: user.name || '',
            street: user.street || '',
            city: user.city || '',
            state: user.state || '',
            zipCode: user.zipCode || '',
            country: user.country || '',
        });
    };

    const AddressCard = () => (
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{addressInfo.name}</h3>
            <p>{addressInfo.street}</p>
            <p>{addressInfo.city}, {addressInfo.state} {addressInfo.zipCode}</p>
            <p>{addressInfo.country}</p>
            <button
                onClick={handleEdit}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
                Edit
            </button>
        </div>
    );

    const AddressForm = () => (
        <div className="space-y-4">
            {Object.entries(addressInfo).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                    <label className="block text-sm font-medium mb-1" htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-black"
                    />
                </div>
            ))}
            <div className="flex space-x-4">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                >
                    Save
                </button>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    return (
        <div className="mt-8 text-white rounded-lg shadow-md w-full max-w-3xl p-6 bg-gray-800">
            <h2 className="text-start mb-4 text-lg font-semibold">
                Address Information
            </h2>
            {isEditing ? <AddressForm /> : <AddressCard />}
        </div>
    );
};

export default Address;