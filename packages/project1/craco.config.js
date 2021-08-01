/**
 *  This file allows us to tweak the create-react-app webpack config(s)
 *  without using 'eject' and without creating a fork of the react-scripts.
 *  https://github.com/gsoft-inc/craco
 */
const CracoEsbuildPlugin = require('craco-esbuild')
const { ProvidePlugin } = require('webpack')

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    // jsx transform is not supported by craco-esbuild
    // inject react imports instead
    // This workaround: https://github.com/pradel/create-react-app-esbuild/issues/7
    // Main esbuild issue: https://github.com/evanw/esbuild/issues/334
    plugins: [new ProvidePlugin({ React: 'react' })], // Doing this will still rely on webpack for dependency injection, which means that even though the build process is much faster now it'll be slightly slower than the potential.
  },
  typescript: {
    enableTypeChecking: !process.env.TRANSPILE_ONLY, // Craco turns on type checking by default. We want to typecheck during development and on build, however, to keep builds fast in CI we want to turn off type checks on build:ci
  },
  // Esbuild settings
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        enableSvgr: true,
      },
    },
  ],
}
