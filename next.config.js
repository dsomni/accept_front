const { API_ENDPOINT } = process.env;

console.log('Config', { API_ENDPOINT });

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_ENDPOINT,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/back/:slug*',
        destination: `${API_ENDPOINT}/api/:slug*`,
      },
      {
        source: '/profile',
        destination: `/profile/me`,
      },
      {
        source: '/edu',
        destination: `/task/list`,
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
