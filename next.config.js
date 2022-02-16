const { API_ENDPOINT } = process.env;

console.log('Config', { API_ENDPOINT });

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:slug*',
        destination: `https://${API_ENDPOINT}/:slug*`,
      },
    ];
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  },
};
