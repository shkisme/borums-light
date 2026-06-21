/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'notion.so',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // accept all subdomains of googleusercontent.com
      },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com', // 노션 기존 S3
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', // 🚨 노션 최신 보안 이미지 서버 (핵심)
      },
      {
        protocol: 'https',
        hostname: 'file.notion.so', // 🚨 노션 신규 파일 서버 (핵심)
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // 🚨 유튜브 썸네일 이미지 서버
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // 🚨 유튜브 썸네일 이미지 서버
      },
    ],
  },
}

module.exports = nextConfig