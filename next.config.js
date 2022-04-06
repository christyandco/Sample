const nextTranslate = require('next-translate');
const removeImports = require('next-remove-imports')();

const nextConfig = nextTranslate({
  reactStrictMode: true,
  basePath: '/tpm',
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
});

module.exports = nextConfig;
