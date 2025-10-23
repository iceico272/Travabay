/** @type {import('next').NextConfig} */
const baseConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'travabay.iceico.co.in',
          pathname: '/uploads/**',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  // Use a dynamic import to avoid static require() - ESLint allows this
  const withTranspileModules = async () => {
    const nextTranspileModules = (await import('next-transpile-modules')).default;
    return nextTranspileModules([])(baseConfig);  // Apply transpile if needed (empty array = no transpiling, but keeps structure)
  };
  
  export default withTranspileModules();  // Note: next.config.js must support async if you go further, but Next.js 13+ allows promises