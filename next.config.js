/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'phototag-app-images.s3.eu-north-1.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }

//   https://get-images-653814252625.s3-accesspoint.eu-north-1.amazonaws.com/image-1.jpg
