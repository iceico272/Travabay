/** @type {import('next').NextConfig} */
const nextConfig = {
    
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'travabay.iceico.co.in',  
              pathname: '/uploads/**', 
          },
          
      ],
  },
};

export default nextConfig;