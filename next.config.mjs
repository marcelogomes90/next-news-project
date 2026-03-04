/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'agenciadenoticias.ibge.gov.br',
      },
    ],
  },
};

export default nextConfig;
