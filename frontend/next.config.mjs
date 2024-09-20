// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['auctregal.s3.eu-north-1.amazonaws.com'], // Add the S3 domain here
//     },
//   };
  
//   export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trippotravel.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
    domains: ['trippotravel.s3.eu-north-1.amazonaws.com'],
  },
};

module.exports = nextConfig;

