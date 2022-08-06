const { API_ENDPOINT, SERVER_URL, VERCEL_URL } = process.env;

console.log('Config', { API_ENDPOINT });

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_ENDPOINT,
    SERVER_URL: VERCEL_URL || SERVER_URL,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/back/:slug*',
        destination: `${API_ENDPOINT}/api/:slug*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/assignment_schema/:slug*',
        destination: '/edu/assignment_schema/:slug*',
        permanent: false,
      },
      {
        source: '/assignment/:slug*',
        destination: '/edu/assignment/:slug*',
        permanent: false,
      },
    ];
  },
};
