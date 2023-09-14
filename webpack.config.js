const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = {
  // ... other options
  devtool: 'source-map', // Source map generation must be turned on,
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    sentryWebpackPlugin({
      authToken: process.env.REACT_APP_SENTRY_AUTH_TOKEN,
      org: 'bread-daaa4ed34',
      project: 'sentry-test'
    })
  ]
};
