import type { NextConfig } from 'next';

// GitHub Pages 静态构建开关：仅 Pages workflow 设 STATIC_EXPORT=1；Vercel 不设，走原动态线（双线互不干扰）
const isStatic = process.env.STATIC_EXPORT === '1';
// 项目页子路径：仓库 wanghoufan/p002-life-species-test → https://wanghoufan.github.io/p002-life-species-test/
const basePath = process.env.BASE_PATH || '/p002-life-species-test';

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath,
      }
    : {}),
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    ...(isStatic ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
