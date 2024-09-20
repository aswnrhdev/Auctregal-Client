'use client';
import React, { useRef, useState } from 'react';
import { addItem } from '@/features/item/itemSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import instance from '@/axios/adminAxios';
import axios from 'axios';

const categories = [
  'Art and Antiques',
  'Jewelry and Watches',
  'Collectables',
  'Vehicles',
  'Wine and Spirits',
  'Rare Books and Manuscripts'
] as const;

type Category = typeof categories[number];

const categoryFields: Record<Category, string[]> = {
  'Art and Antiques': ['Title', 'Artist', 'Year', 'Medium', 'Dimensions', 'Condition', 'Provenance', 'Base Price', 'Current Price'],
  'Jewelry and Watches': ['Title', 'Brand', 'Material', 'Gemstone', 'Carat Weight', 'Condition', 'Certification', 'Base Price', 'Current Price'],
  'Collectables': ['Title', 'Type', 'Era', 'Condition', 'Rarity', 'Manufacturer', 'Base Price', 'Current Price'],
  'Vehicles': ['Make', 'Model', 'Year', 'Mileage', 'Condition', 'VIN', 'Color', 'Base Price', 'Current Price'],
  'Wine and Spirits': ['Name', 'Type', 'Vintage', 'Region', 'ABV', 'Bottle Size', 'Condition', 'Base Price', 'Current Price'],
  'Rare Books and Manuscripts': ['Title', 'Author', 'Year', 'Edition', 'Condition', 'Publisher', 'Language', 'Base Price', 'Current Price']
};

const Spinner: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

const Checkmark: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="rounded-full h-32 w-32 bg-green-500 flex items-center justify-center">
      <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
);

const AddItem: React.FC = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [formData, setFormData] = useState<Record<string, string | number>>({
    description: ''
  });
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as Category);
    setFormData({ description: '' });
    setPrimaryImage(null);
    setSecondaryImages([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const numericValue = isNaN(Number(value)) ? value : Number(value);

    setFormData(prevData => ({
      ...prevData,
      [name]: numericValue,
      ...(name === 'Base Price' ? { 'Current Price': numericValue } : {})
    }));
  };

  const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrimaryImage(e.target.files[0]);
    }
  };

  const handleSecondaryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSecondaryImages(Array.from(e.target.files).slice(0, 3));
    }
  };

  const resetForm = () => {
    setSelectedCategory('');
    setFormData({ description: '' });
    setPrimaryImage(null);
    setSecondaryImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });

    formDataToSend.append('category', selectedCategory);

    if (primaryImage) {
      formDataToSend.append('primaryImage', primaryImage);
    }
    secondaryImages.forEach((image, index) => {
      formDataToSend.append(`secondaryImage${index + 1}`, image);
    });

    try {
      const response = await axios.post('https://auctregal.rudopedia.shop/admin/add-item', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Item added successfully:', response.data);
      dispatch(addItem(response.data));
      setIsLoading(false);
      setIsSuccess(true);
      resetForm();
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding item:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-[#1A120B] rounded-lg">
      <h1 className="text-2xl font-thin">Add Item</h1>
      <p className='font-thin mb-5'>Select a category below and enter the details to add an item to the list</p>
      {isLoading && <Spinner />}
      {isSuccess && <Checkmark />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded text-black"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div>
            <div className="mb-4">
              <div className="mb-2">
                <label htmlFor="primaryImage" className="block mb-2 font-thin">Primary Image</label>
                <input
                  type="file"
                  id="primaryImage"
                  onChange={handlePrimaryImageChange}
                  accept="image/*"
                  className="w-full p-2 border rounded font-thin"
                />
                {primaryImage && (
                  <Image
                    src={URL.createObjectURL(primaryImage)}
                    alt="Primary"
                    width={640}
                    height={480}
                    className="mt-2 max-w-xs"
                  />
                )}
              </div>
              <div>
                <label htmlFor="secondaryImages" className="block mb-2 font-thin">Secondary Images (up to 3)</label>
                <input
                  type="file"
                  id="secondaryImages"
                  onChange={handleSecondaryImagesChange}
                  accept="image/*"
                  multiple
                  className="w-full p-2 border rounded font-thin"
                  ref={fileInputRef}
                />
                <div className="mt-2 flex space-x-2">
                  {secondaryImages.map((img, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`Secondary ${index + 1}`}
                      width={160}
                      height={120}
                      className="max-w-xs h-20"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2 font-thin">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
                rows={4}
              />
            </div>

            {categoryFields[selectedCategory].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block mb-2 font-thin">{field}</label>
                <input
                  type={field === 'Base Price' || field === 'Current Price' ? 'number' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                  readOnly={field === 'Current Price'}
                />
              </div>
            ))}

            <button type="submit" className="bg-[#3C2A21] text-white px-4 py-2 rounded font-thin">
              Add a New Entry
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddItem;