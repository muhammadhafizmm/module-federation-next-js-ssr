const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = {
  reactStrictMode: true,
  output: "export",
  staticPageGenerationTimeout: 120,
  // Add a trailing slash to all paths `/about` -> `/about/`
  // this is required to be true if it needs to deployed on AWS S3 Static Hosting
  // This option will generate build folder with index.html for each pages
  // That AWS can understand wheere to use the file on routing path
  trailingSlash: true,
  // Change the output directory `out` -> `dist`
  distDir: "build",
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'checkout',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './title': './components/exposedTitle.js',
          './checkout': './pages/checkout.js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions:{
          exposePages: true
        }
      }),
    );

    return config;
  },
};
