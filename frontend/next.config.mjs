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
        hostname: 'auctregal.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
    // Optional: increase the default image loader timeout
    loader: 'default',
    domains: ['auctregal.s3.eu-north-1.amazonaws.com'],
  },
};

export default nextConfig;

