const { API_ENDPOINT } = process.env;

console.log('Config', { API_ENDPOINT });

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/back/:slug*',
        destination: `http://${API_ENDPOINT}/api/:slug*`,
      },
    ];
  },
};
