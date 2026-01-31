/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: import.meta.dirname,
  },
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  // Turns on file change polling for the Windows Dev Container
  // Doesn't work currently for turbopack, so file changes will not automatically update the client.
  // watchOptions: isWindowsDevContainer()
  // ? {
  //     pollIntervalMs: 1000
  //   }
  // : undefined,
};

export default nextConfig;
