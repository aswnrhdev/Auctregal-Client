// 'use client'

// import { useState } from 'react';

// const HomeTopBar = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('English');
//   const [showLanguageOptions, setShowLanguageOptions] = useState(false);

//   const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

//   const toggleLanguageOptions = () => {
//     setShowLanguageOptions(!showLanguageOptions);
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     setShowLanguageOptions(false);
//   };

//   return (
//     <div className='flex justify-end gap-5 pt-2 pb-2 bg-[#3C3633] font-thin pr-8'>
//       <p className='cursor-pointer'>How Auctions Work</p>
//       <p className='cursor-pointer'>Contact Us</p>
      
//       <div className='relative'>
//         <p className='cursor-pointer' onClick={toggleLanguageOptions}>
//           {selectedLanguage}
//         </p>
//         {showLanguageOptions && (
//           <div className='absolute right-0 mt-2 w-32 bg-[#2C3639] text-white shadow-md z-50'>
//             {languages.map((language) => (
//               <p
//                 key={language}
//                 className='cursor-pointer px-4 py-2 hover:bg-[#3F4E4F]'
//                 onClick={() => handleLanguageChange(language)}
//               >
//                 {language}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeTopBar;


'use client'

import { useState } from 'react';

const HomeTopBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [showLanguageOptions, setShowLanguageOptions] = useState<boolean>(false);

  const languages: string[] = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageOptions(false);
  };

  return (
    <div className='flex justify-end gap-5 pt-2 pb-2 bg-[#3C3633] font-thin pr-8'>
      <p className='cursor-pointer'>How Auctions Work</p>
      <p className='cursor-pointer'>Contact Us</p>
      
      <div className='relative'>
        <p className='cursor-pointer' onClick={toggleLanguageOptions}>
          {selectedLanguage}
        </p>
        {showLanguageOptions && (
          <div className='absolute right-0 mt-2 w-32 bg-[#2C3639] text-white shadow-md z-50'>
            {languages.map((language) => (
              <p
                key={language}
                className='cursor-pointer px-4 py-2 hover:bg-[#3F4E4F]'
                onClick={() => handleLanguageChange(language)}
              >
                {language}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTopBar;
